import Controller from '@ember/controller';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class Dashboard extends Controller {
  @service api
  @service store

  @restartableTask fetchPerformanceStatsTask = function *() {
    return yield this.api.request(`progresses/stats/${this.lastAccessedRun.get('topRunAttempt.id')}`)
  }

  @restartableTask fetchAppliedJobsTask = function *() {
    return yield this.store.query('job', {
      filter: {
        eligibilityStatus: 'applied'
      },
      include: 'company',
      sort: '-postedOn',
      page: {
        limit: 2
      }
    })
  }

  @restartableTask fetchWishlistCoursesTask = function *() {
    return yield this.store.query('user-course-wishlist', {
      include: 'course',
      exclude: 'course.*',
      page: {
        limit: 2
      }
    })
  }

  @restartableTask fetchCoursesTask = function* () {
    return yield this.store.query("run", {
      include: "course,run_attempts",
      enrolled: true,
      page: {
        limit: 5
      }
    });
  }

  @restartableTask fetchHackerblocksStats = function *() {
    return yield this.api.request('/hb/performance')
  }
}
