import Component from '@ember/component';
import { inject as service } from '@ember-decorators/service';
import { restartableTask } from 'ember-concurrency-decorators';

export default class MyCoursesTaskComponent extends Component {
  @service store;
  @service api;
  runs = null

  LIMIT = 8
  OFFSET = 0

  didReceiveAttrs () {
    this._super(...arguments)
    this.get('fetchMyCoursesTask').perform()
  }

  @restartableTask
  *fetchMyCoursesTask () {
    const runs = yield this.get("store").query("run", {
      include: "course,run_attempts",
      enrolled: true,
      page: {
        offset: this.OFFSET,
        limit: this.LIMIT
      }
    });
    this.set('OFFSET', this.OFFSET + this.LIMIT)
    
    if (!this.runs) {
      this.set('runs', runs.toArray())
    } else {
      this.get('runs').pushObjects(runs.toArray())
    }
    return runs
  }
}
