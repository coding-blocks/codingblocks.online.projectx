import Route from '@ember/routing/route';

export default class CoursesRouter extends  Route {
    constructor() {
      super()
      this.headData =  Ember.inject.service()
    }

    model () {
        return this.store.query ('course', {
          include: 'instructors,runs',
          sort: 'difficulty'
        })
    }

    setupController (controller, model) {
        controller.set ("courses", model)
    }

    afterModel(model) {
      this.set('headData.title', 'Coding Blocks Online | All Courses')
    }
}
