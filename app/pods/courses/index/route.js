import Route from '@ember/routing/route';

export default class CoursesRouter extends  Route {
    model () {
        return this.store.findAll ('course')
    }

    setupController (controller, model) {
        controller.set ("courses", model)
    }
}
