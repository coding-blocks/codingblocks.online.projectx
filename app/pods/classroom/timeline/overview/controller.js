import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';
import config from 'codingblocks-online/config/environment';
import moment from 'moment';

export default class Overview extends Controller {
  @service api

  discussBaseUrl = config.discussBaseUrl
  queryParams = ['offset', 'limit']
  visible = true
  offset = 0
  limit = 5

  @computed('runAttempt.{isExpired,end}')
  get showExtensions() {
    const endIsNear = moment().add(1, "month") > moment.unix(this.runAttempt.end)
    return this.runAttempt.isExpired || endIsNear
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

  @restartableTask fetchProgressTask = function *() {
    return yield this.api.request(`run_attempts/${this.runAttempt.id}/progress`)
  }

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
}
