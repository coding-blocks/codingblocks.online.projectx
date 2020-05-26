import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class BlockersCertificateComponent extends Component {
  @service api
  @service store
  @service router
  @service currentUser
 
  @action
  continue() {
    this.get('onContinue')()
  }
}
