import Route from '@ember/routing/route';

export default Ember.Route.extend({
  queryParams: {
    limit: {
      refreshModel: true
    },
    offset: {
      refreshModel: true
    }
  },
    model (params) {
        return this.store.query ('course', {
          include: 'runs',
          sort: 'difficulty',
          page:{
            limit:params.limit,
            offset:params.offset
          }
        })
    },

    setupController (controller, model) {
        controller.set ("courses", model)
    }
})
