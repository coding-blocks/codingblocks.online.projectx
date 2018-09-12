import Component from '@ember/component';
import { service } from 'ember-decorators/service';
import { task } from 'ember-concurrency';
import { alias } from 'ember-decorators/object/computed';
import { readOnly } from 'ember-decorators/object';
import { action } from 'ember-decorators/object';
import env from "codingblocks-online/config/environment";

export default class RecommendedTaskComponent extends Component {
  @service store;
  @service session;
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
        recommended: true,
        unlisted: false
      },
      include: "instructors,runs",
      exclude: "ratings",
      sort: 'difficulty'
    });
  });

  @action
  logIn() {
    localStorage.setItem('redirectionPath', this.get('router.currentURL'))
    window.location.href = `${env.oneauthURL}/oauth/authorize?response_type=code&client_id=${env.clientId}&redirect_uri=${env.publicUrl}`
  }
}
