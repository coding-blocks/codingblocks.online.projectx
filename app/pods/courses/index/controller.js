import Ember from 'ember';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  queryParams: ['limit', 'offset'],
  limit: 9,
  offset: 0,


  showLoadMore: computed('offset', 'count', 'limit', function () {
    let limit = this.get('limit')
    let offset = this.get('offset')
    let count = this.get('count')
    return offset + limit < count
  }),

  taskMoreCourses: task(function * () {
    const nextCourses = yield this.store.query ('course', {
      include: 'runs',
      sort: 'difficulty',
      page:{
        limit: this.get('limit'),
        offset: this.get('offset')
      }
    })
    this.get('courses').addObjects(nextCourses)
  }),

  actions:{
    loadMore: function() {
      this.set('offset', this.get('nextOffset'))
      this.get('taskMoreCourses').perform()
    }
  }
})
