import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { restartableTask } from 'ember-concurrency-decorators';
import { action } from '@ember/object';

export default class MyCoursesController extends Controller {
  @service store
  @service layout

  queryParams = ['limit', 'offset']
  limit = 5
  offset = 0

  tabs = [
    {
      name: 'Active',
      component: 'my-courses-list/purchased',
      task: this.fetchPurchased
    },
    {
      name: 'Free Trials',
      component: 'my-courses-list/free-trials',
      task: this.fetchFreeTrails
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
    name: 'Purchased',
    component: 'my-courses-list/recently-accessed',
    task: this.fetchPurchased
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

  @restartableTask fetchPurchased = function* () {
    return this.fetchRunsWithScope('purchased')
  }

  @restartableTask fetchFreeTrails = function* () {
    return this.fetchRunsWithScope('trials')
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
