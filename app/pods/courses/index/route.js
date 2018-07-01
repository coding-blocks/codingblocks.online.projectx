import Route from '@ember/routing/route';

export default Ember.Route.extend({
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
      controller.set('courses', model.toArray())
      controller.set("nextOffset", model.get('meta').pagination.nextOffset )
      controller.set("count", model.get('meta').pagination.count )

    }
})
