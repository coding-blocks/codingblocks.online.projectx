import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { dropTask } from 'ember-concurrency-decorators';

export default class BlockersCertificateComponent extends Component {
  @service api
  @service store
  @service router
  @service currentUser
  @dropTask generateCertificateTask = function * () {
    this.api.request('certificates', {
      method: 'POST',
      data: {
        runAttemptId: this.get('runAttempt.id')
      }
    })
      this.set('generationRequested', true)
      this.set('checkAndGenerate', false)
  }
}
