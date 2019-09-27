import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';
import { alias, reads } from '@ember/object/computed';
import { action } from '@ember/object';
import env from "codingblocks-online/config/environment";
import { getPublicUrl } from "codingblocks-online/utils/browser"


export default class RecommendedTaskComponent extends Component {
  @service store;
  @service session;
  @service currentUser
  @service domain

  @reads("fetchRecommendedCoursesTask.lastSuccessful.value")  
  recommendedCourses;

  @reads("currentUser.organization") organization
  
  didReceiveAttrs () {
    this._super(...arguments)
    this.get('fetchRecommendedCoursesTask').perform()
  }

  @restartableTask fetchRecommendedCoursesTask = function* ()  {
    const filter = {
      recommended: true,
      unlisted: false
    }

    if (this.domain.isExternal) {
      // external
      filter.domains = {
        $contains: [this.domain.domain]
      }
    }

    if (this.get('organization')) {
      filter.organization = this.get('organization')
    }
    return yield this.get("store").query("course", {
      filter,
      include: "instructors,runs",
      exclude: "ratings,instructors.*,feedbacks,runs.*",
      sort: 'difficulty',
      page: {
        limit: 12
      }
    });
  }

  @action
  logIn() {
    localStorage.setItem('redirectionPath', this.get('router.currentURL').replace("/app", "/"))
    window.location.href = `${env.oneauthURL}/oauth/authorize?response_type=code&client_id=${env.clientId}&redirect_uri=${getPublicUrl()}`
  }
}
