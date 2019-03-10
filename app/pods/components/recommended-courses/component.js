import Component from '@ember/component';
import { inject as service } from '@ember-decorators/service';
import { restartableTask } from 'ember-concurrency-decorators';
import { alias, reads } from '@ember-decorators/object/computed';
import { action } from '@ember-decorators/object';
import env from "codingblocks-online/config/environment";

export default class RecommendedTaskComponent extends Component {
  @service store;
  @service session;
  @service currentUser

  @reads("fetchRecommendedCoursesTask.lastSuccessful.value")  
  recommendedCourses;

  @reads("currentUser.organization") organization
  
  constructor () {
    super(...arguments)
    this.get('fetchRecommendedCoursesTask').perform()
  }

  @restartableTask
  *fetchRecommendedCoursesTask () {
    const filter = {
      recommended: true,
      unlisted: false
    }

    if (this.get('organization')) {
      filter.organization = this.get('organization')
    }
    return yield this.get("store").query("course", {
      filter,
      include: "instructors,runs",
      exclude: "ratings",
      sort: 'difficulty'
    });
  }

  @action
  logIn() {
    localStorage.setItem('redirectionPath', this.get('router.currentURL'))
    window.location.href = `${env.oneauthURL}/oauth/authorize?response_type=code&client_id=${env.clientId}&redirect_uri=${env.publicUrl}`
  }
}
