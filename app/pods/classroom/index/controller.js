import Controller from "@ember/controller";
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';

export default class MyCoursesController extends Controller {
  @service store

  queryParams = ['limit', 'offset']
  limit = 10
  offset = 0

  tabs = [
    {
      name: "Recently Accessed",
      component: "my-courses-list/recently-accessed",
      task: this.fetchRecentlyAccessedRuns
    },
    {
      name: "All Courses",
      component: "my-courses-list/all-courses"
    }
  ];

  activeTab =  {
    name: "Recently Accessed",
    component: "my-courses-list/recently-accessed",
    task: this.fetchRecentlyAccessedRuns
  }

  @restartableTask fetchRecentlyAccessedRuns = function *() {
    return this.get("store").query("run", {
      include: "course,run_attempts",
      enrolled: true,
      page: {
        limit: this.limit,
        offset: this.offset
      },
      scope: ['active']
    })
  }

}
