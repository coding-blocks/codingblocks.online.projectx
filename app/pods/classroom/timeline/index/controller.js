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

  queryParams = ['showFeedback']
  showFeedback = false

  discussBaseUrl = config.discussBaseUrl
  visible = true

  @computed('runAttempt.{isExpired,end,premium}')
  get showExtensions() {
    const {end, isExpired, premium} = this.runAttempt
    const endIsNear = moment().add(1, "month") > moment.unix(end)
    return premium && (isExpired || endIsNear)
  }

  @computed('runAttempt.{premium,isExpired}')
  get showBuyNow() {
    const ra = this.runAttempt
    return !ra.premium || ra.isExpired
  }

  @computed('runAttempt.run.completionThreshold')
  get certificateLockOffset() {
    return 0.9 * this.runAttempt.get('run.completionThreshold')
  }

  @computed('runAttempt.run.goodiesThreshold')
  get goodiesLockOffset() {
    return 0.9 * this.runAttempt.get('run.goodiesThreshold')
  }

  @alias('runAttempt.progressPercent')
  progressPercent

  @restartableTask fetchPerformanceStatsTask = function *() {
    return yield this.api.request(`progresses/stats/${this.runAttempt.id}`)
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
  resetProgress() {
    this.get('api').request('progresses/reset', {
      method: 'POST',
      data: {
        runAttemptId: this.get('runAttempt.id')
      }
    }).then(() => this.send('reloadRoute'))
  }

  @action
  log(event, course){
    this.metrics.trackEvent({event, course, page: 'Classroom'})
  }
}
