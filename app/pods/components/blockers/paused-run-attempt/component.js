import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service'

export default class PausedRunAttempt  extends Component {
  @service api
  @service router

  @action
  async unpauseRunAttempt() {
    await this.get('api').request(`run_attempts/${this.runAttempt.id}/unpause`, {
      method: 'PATCH'
    })
    return window.location.reload()
  }
}
