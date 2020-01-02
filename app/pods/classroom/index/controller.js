import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { restartableTask } from 'ember-concurrency-decorators';
import { action } from '@ember/object';

export default class MyCoursesController extends Controller {
  @service store

  queryParams = ['limit', 'offset']
  limit = 5
  offset = 0

  tabs = [
    {
      name: 'Recently Accessed',
      component: 'my-courses-list/recently-accessed',
      task: this.fetchRecentlyAccessedRuns
    },
    {
      name: 'All Courses',
      component: 'my-courses-list/all-courses',
      task: this.fetchAllRuns
    },
    {
      name: 'Wishlisted',
      component: 'my-courses-list/wishlisted-courses',
      task: this.fetchWishlistedCourses
    },
    {
      name: 'Expired',
      component: 'my-courses-list/expired-courses',
      task: this.fetchExpiredCourses
    }
  ];

  activeTab = {
    name: 'Recently Accessed',
    component: 'my-courses-list/recently-accessed',
    task: this.fetchRecentlyAccessedRuns
  }


  @alias('activeTab.task.lastSuccessful.value.meta.pagination')
  pagination

  @action
  paginate(page) {
    this.set("offset", (page - 1) * this.limit);
    this.activeTab.task.perform()
  }

  @action
  changeTab(tab) {
    this.setProperties({
      activeTab: tab,
      offset: 0,
    })
  }

  @restartableTask fetchRecentlyAccessedRuns = function* () {
    return this.fetchRunsWithScope('active')
  }

  @restartableTask fetchWishlistedCourses = function* () {
    return this.store.query('user-course-wishlist', {
      include: 'course',
      page: {
        limit: this.limit,
        offset: this.offset
      }
    })
  }

  @restartableTask fetchAllRuns = function* () {
    return this.fetchRunsWithScope()
  }

  @restartableTask fetchExpiredCourses = function *() {
    return this.fetchRunsWithScope('expired')
  }

  fetchRunsWithScope(scope) {
    return this.get('store').query('run', {
      include: 'course,run_attempts',
      enrolled: true,
      page: {
        limit: this.limit,
        offset: this.offset
      },
      ...(scope && { scope })
    })
  }


}
