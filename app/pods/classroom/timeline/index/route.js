import Route from '@ember/routing/route';

export default Route.extend({
    model () {
       return this.modelFor('classroom.timeline')
    },
    setupController(controller, model) {
        controller.set("course", model.get("course"))
        controller.set("run", model)
    }
});
