import Component from '@ember/component';
import { service } from 'ember-decorators/service';
import { task } from 'ember-concurrency';
import { alias } from 'ember-decorators/object/computed';
import { readOnly } from 'ember-decorators/object';
 

export default class RecommendedTaskComponent extends Component {
  @service store;
  @readOnly
  @alias("fetchRecommendedCoursesTask.lastSuccessful.value")
  recommendedCourses;

  constructor () {
    super(...arguments)
    this.get('fetchRecommendedCoursesTask').perform()
}

  fetchRecommendedCoursesTask = task(function*() {
    return yield this.get("store").query("course", {
      filter: {
        recommended: true
      },
      include: "instructor,runs"
    });
  });
}