import Component from '@ember/component';
import { inject as service } from '@ember-decorators/service';
import { restartableTask } from 'ember-concurrency-decorators';
import { alias } from '@ember-decorators/object/computed';
import { readOnly } from '@ember-decorators/object/computed';


export default class MyCoursesTaskComponent extends Component {
  @service store;
  @service api;
  @readOnly("fetchMyCoursesTask.lastSuccessful.value") runs

  didReceiveAttrs () {
    this._super(...arguments)
    this.get('fetchMyCoursesTask').perform()
}

  @restartableTask
  *fetchMyCoursesTask () {
    return yield this.get("store").query("run", {
      include: "course,run_attempts",
      enrolled: true
    });
  }

    
}
