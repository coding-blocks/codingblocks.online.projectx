import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators'
import { inject as service } from '@ember/service';

export default class DashboardCoursesListItem extends Component {
  @service api

  @restartableTask fetchProgressTask = function *() {
    return yield this.api.request(`run_attempts/${this.run.get('topRunAttempt.id')}/progress`)
  }
}
