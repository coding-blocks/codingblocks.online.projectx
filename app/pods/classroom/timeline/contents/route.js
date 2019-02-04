import Route from '@ember/routing/route';

export default Route.extend({
    model () {
        return this.modelFor('classroom.timeline')
    },
    setupController (controller, model) {
        controller.set("run", model.get("run"))
        controller.set("sections", model.get("run.sections"))
        this._super(...arguments)
    }
});
