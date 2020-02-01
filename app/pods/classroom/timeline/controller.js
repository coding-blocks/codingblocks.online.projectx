import Controller from '@ember/controller';

export default class TimelineController extends Controller {
  queryParams = ['showFeedback']
  showFeedback = false

  @service api

  @computed('run.topRunAttempt.{premium,isExpired}')
  get showBuyNow() {
    const ra = this.get('run.topRunAttempt')
    return !ra.premium || ra.isExpired
  }

  @computed('runAttempt.{premium}', 'run.price')
  get showGoodieRequest() {
    return this.runAttempt.premium && this.get('run.price')
  }

  @computed('runAttempt')
  get progress() {
    return DS.PromiseObject.create({
      promise: this.api.request(`run_attempts/${this.runAttempt.id}/progress`)
    })
  }

  @computed('runAttempt.{isExpired,end}')
  get showExtensions() {
    const endIsNear = moment().add(1, "month") > moment.unix(this.runAttempt.end)
    return this.runAttempt.isExpired || endIsNear
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
