import Component from '@ember/component';
import { service } from 'ember-decorators/service';
import { task } from 'ember-concurrency';
import { alias } from 'ember-decorators/object/computed';
import { readOnly } from 'ember-decorators/object';


export default class MyCoursesTaskComponent extends Component {
  @service store;
  @readOnly
  @alias("fetchMyCoursesTask.lastSuccessful.value")
  runs;

  constructor () {
    super(...arguments)
    this.get('fetchMyCoursesTask').perform()
}

  fetchMyCoursesTask = task(function*() {
    return yield this.get("store").query("run", {
      include: "course,run_attempts",
      enrolled: true
    });
  });
}
