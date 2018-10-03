import Route from '@ember/routing/route';

export default class CoursesRouter extends  Route {
    constructor() {
      super()
      this.headData =  Ember.inject.service()
    }

    model (params) {
         return this.store.query ('course', {
          include: 'runs',
          sort: 'difficulty',
          exclude: "ratings",
          filter: {
            unlisted: false
          },
          limit:params.limit,
          offset:params.offset
        })
    }

    setupController (controller, model) {
      controller.set('courses', model.toArray())
      controller.set("nextOffset", model.get('meta').pagination.nextOffset )
      controller.set("count", model.get('meta').pagination.count )

    }
    afterModel(model) {
      this.set('headData.title', 'Coding Blocks Online | All Courses')
    }
}
