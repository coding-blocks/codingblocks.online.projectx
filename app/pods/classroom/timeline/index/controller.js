import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';
import config from 'codingblocks-online/config/environment';
import moment from 'moment';
import { alias } from '@ember/object/computed';

export default class Overview extends Controller {
  @service api
  @service metrics
  @service productTour

  queryParams = ['showFeedback']
  showFeedback = false

  discussBaseUrl = config.discussBaseUrl
  visible = true

  @computed('runAttempt.{end,premium}', 'runAttempt.run.price')
  get showGoodieRequest() {
    return this.runAttempt.premium && this.runAttempt.get('run.price')
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
}
