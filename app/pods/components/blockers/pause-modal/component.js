import Component from '@ember/component';
import {action} from '@ember/object'
import { inject as service } from '@ember/service';

export default class BlockersPauseModalComponent extends Component {
  @service api
  @service store
  @service router
  
  @action
  async pauseRunAttempt() {
    const resp = await this.get('api').request(`run_attempts/${this.runAttempt.id}/pause`, {
      method: 'PATCH'
    })
    this.set('show', false)
    this.store.pushPayload(resp)
    if(this.redirectTo){
      this.get('router').transitionTo(this.redirectTo)
    }
  }
}
