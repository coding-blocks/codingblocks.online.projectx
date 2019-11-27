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
      component: "my-courses-list/all-courses",
      task: this.fetchAllRuns
    }
  ];

  activeTab = {
    name: "Recently Accessed",
    component: "my-courses-list/recently-accessed",
    task: this.fetchRecentlyAccessedRuns
  }

  fetchRunsWithScope(scope) {
    return this.get("store").query("run", {
      include: "course,run_attempts",
      enrolled: true,
      page: {
        limit: this.limit,
        offset: this.offset
      },
      ...(scope && { scope })
    })
  }

  @restartableTask fetchRecentlyAccessedRuns = function* () {
    const scope = 'active'
    return this.get("store").query("run", {
      include: "course,run_attempts",
      enrolled: true,
      page: {
        limit: this.limit,
        offset: this.offset
      },
      ...(scope && { scope })
    })
  }

  @restartableTask fetchAllRuns = function *() {
    return this.fetchRunsWithScope()
  }

}
