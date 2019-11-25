import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default class MyCoursesListView extends Component {
  @service store

  @alias('fetchCoursesTask.lastSuccessful.value') runs

  didReceiveAttrs() {
    this.fetchCoursesTask.perform()
  }

  @restartableTask fetchCoursesTask = function *() {
    return yield this.store.query("run", {
      include: "course,run_attempts",
      enrolled: true,
      page: {
        limit: this.limit,
        offset: this.offset
      }
    });
  }
}
