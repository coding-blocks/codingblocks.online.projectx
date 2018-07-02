import Route from '@ember/routing/route';

export default class CoursesRouter extends  Route {
    model () {
        return this.store.query ('course', {
          include: 'instructors,runs',
          sort: 'difficulty'
        })
    }

    setupController (controller, model) {
        controller.set ("courses", model)
    }
}
