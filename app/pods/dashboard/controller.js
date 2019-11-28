import Controller from '@ember/controller';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class Dashboard extends Controller {
  @service api

  @restartableTask fetchPerformanceStatsTask = function *() {
    return yield this.api.request(`progresses/stats/${this.lastAccessedRun.get('topRunAttempt.id')}`)
  }
}
