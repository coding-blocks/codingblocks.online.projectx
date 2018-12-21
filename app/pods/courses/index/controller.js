import Ember from 'ember';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { alias }  from '@ember/object/computed';

export default Ember.Controller.extend({
  queryParams: ['limit', 'offset'],
  limit: 9,
  offset: 0,
  currentUser: service(),
  organization: alias('currentUser.user.organization'),
  taskMoreCourses: task(function * () {
    const extraWhere = {}
    const organization = this.get('organization')
    
    if (organization) {
      extraWhere.organization = organization
    }

    const nextCourses = yield this.store.query ('course', {
      include: 'runs',
      sort: 'difficulty',
      filter: {
        unlisted: false,
        ...extraWhere
      },
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
