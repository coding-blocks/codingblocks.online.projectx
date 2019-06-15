import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import DS from 'ember-data'

export default class TimelineController extends Controller {
  queryParams = ['showFeedback']
  showFeedback = false

  @service api

  @computed('run.topRunAttempt.{premium,isExpired}')
  get showBuyNow() {
    const ra = this.get('run.topRunAttempt')
    return !ra.premium || ra.isExpired
  }

  @computed('runAttempt')
  get progress() {
    return DS.PromiseObject.create({
      promise: this.api.request(`run_attempts/${this.runAttempt.id}/progress`)
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
