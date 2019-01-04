import Component from '@ember/component';
import { service } from 'ember-decorators/service';
import { action } from 'ember-decorators/object';
import { later } from '@ember/runloop'

export default class SubmissionsComponent extends Component {
  @service hbApi
  @service store

  showSubmissionModal = false

  didReceiveAttrs () {
    this._super(...arguments)
    let payload = this.get('problemPayload')
    if (payload) {
      payload = JSON.parse(JSON.stringify(payload))
      this.get('store').unloadAll('problem')
      later(() => {
        this.get('store').pushPayload(payload)
        this.set('problem', this.get('store').peekAll('problem').objectAt(0))
      }, 0)
    }
  }

  @action
  viewSubmission (submission) {
    this.set('showSubmissionModal', true)
  }
}
