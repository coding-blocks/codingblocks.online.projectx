import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';
import config from 'codingblocks-online/config/environment';
import moment from 'moment';
import { alias } from '@ember/object/computed';

export default class Overview extends Controller {
  @service api
  @service store
  @service metrics
  @service productTour

  queryParams = ['showFeedback']
  showFeedback = false

  discussBaseUrl = config.discussBaseUrl
  visible = true
  showUpgradeModal = false

  @computed('runAttempt.{end,premium}', 'runAttempt.run.price')
  get showCertificateRequest() {
    return this.runAttempt.premium && this.runAttempt.get('run.certificateTemplate')
  }

  @computed('runAttempt.{end,premium}', 'runAttempt.run.price')
  get showGoodieRequest() {
    const {premium, runTier} = this.runAttempt
    return premium && this.runAttempt.get('run.price') && runTier != 'LITE'
  }

  @computed('runAttempt.{isExpired,end,premium}')
  get showExtensions() {
    const endIsNear = moment().add(1, "month") > moment.unix(this.runAttempt.end)
    return (this.runAttempt.isExpired || endIsNear) && this.runAttempt.premium
  }

  @computed('runAttempt.{premium,isExpired}')
  get showBuyNow() {
    const ra = this.runAttempt
    return !ra.premium || ra.isExpired
  }

  @computed('runAttempt.run.completionThreshold')
  get certificateLockOffset() {
    return 0.84 * this.runAttempt.get('run.completionThreshold')
  }

  @computed('runAttempt.run.goodiesThreshold')
  get goodiesLockOffset() {
    return 0.84 * this.runAttempt.get('run.goodiesThreshold')
  }

  @computed('course.topRun')
  get totalContents() {
    return this.course.get('topRun').totalContents
  }

  @computed('course.topRun')
  get doneContents() {
    return this.runAttempt.completedContents
  }

  @computed('run.tier')
  get tierIcon() {
    switch (this.get('run.tier')) {
      case 'LITE': return 'https://cb-thumbnails.s3.ap-south-1.amazonaws.com/lite.png'
      case 'PREMIUM': return 'https://cb-thumbnails.s3.ap-south-1.amazonaws.com/premium.png'
      case 'LIVE': return 'https://cb-thumbnails.s3.ap-south-1.amazonaws.com/live.png'
      case 'CLASSROOM': return 'https://cb-thumbnails.s3.ap-south-1.amazonaws.com/classroom.png'
      default:
        return 'https://cb-thumbnails.s3.ap-south-1.amazonaws.com/lite.png'
    }
  }
  
  @computed('runAttempt.paused')
  get canBePaused(){
    return this.runAttempt.isPausable && !this.runAttempt.paused
  }


  @alias('runAttempt.progressPercent')
  progressPercent

  @restartableTask fetchPerformanceStatsTask = function *() {
    const leaderboard = yield this.api.request(`runs/${this.runAttempt.get('run.id')}/leaderboard`).catch(console.log)
    const stats = yield this.api.request(`progresses/stats/${this.runAttempt.id}`)
    return {
      ...stats,
      leaderboard: leaderboard || []
    }
  }

  @action
  requestCertificate () {
    this.api.request('/certificates', {
      method: 'POST',
      data: {
        runAttemptId: this.get('runAttempt.id')
      }
    })
  }

  @action
  async resetProgress() {
    await this.get('api').request('progresses/reset', {
      method: 'POST',
      data: {
        runAttemptId: this.get('runAttempt.id')
      }
    })
    this.set('showConfirmResetProgress', false)
    return this.runAttempt.reload()
  }

  @action
  startTour() {
    this.productTour.start(true)
  }

  @action
  log(event, course){
    this.metrics.trackEvent({
      action: event,
      category: course,
    })
  }
  
  @action
  async unpauseRunAttempt() {
    await this.get('api').request(`run_attempts/${this.runAttempt.id}/unpause`, {
      method: 'PATCH'
    })
    return this.set('runAttempt.paused', false)
  }

  @action
  redirectToClassRoom(){
    return this.transitionToRoute('classroom')
  }
}
