import Route from '@ember/routing/route';

export default Route.extend({
    model () {
        return this.modelFor('classroom.timeline').get("run")
    },
    setupController (controller, model) {
        controller.set("run", model)
        controller.set("sections", model.get("course.sections"))
    }
});
