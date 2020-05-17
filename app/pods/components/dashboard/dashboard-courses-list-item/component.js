import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DashBoardCoursesListItem  extends Component {
  @service api
  @action
  async unpauseRunAttempt() {
    await this.get('api').request(`run_attempts/${this.run.topRunAttempt.id}/unpause`, {
      method: 'PATCH'
    })
    return this.set('run.topRunAttempt.paused', false)
  }

};
