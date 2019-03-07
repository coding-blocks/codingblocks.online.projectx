import Component from '@ember/component';
import { inject as service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object';
import { later } from '@ember/runloop'

export default class SubmissionsComponent extends Component {
  @service hbApi
  @service store

  showSubmissionModal = false
  submissionToView = null

  didReceiveAttrs () {
    this._super(...arguments)
    const code = this.get('code')
    let payload = this.get('problemPayload')
    
    if (payload) {
      payload = JSON.parse(JSON.stringify(payload))
      this.get('store').unloadAll('problem')
      later(() => {
        this.get('store').pushPayload(payload)
        this.set('problem', this.get('store').peekRecord('problem', code.get('hbProblemId')))
      }, 0)
    }
  }

  @action
  viewSubmission (submission) {
    this.set('submissionToView', submission)
    this.set('showSubmissionModal', true)
  }
}
