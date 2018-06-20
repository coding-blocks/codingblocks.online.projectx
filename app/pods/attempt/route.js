import Route from '@ember/routing/route';

export default Route.extend({
    model (params) {
        return this.store.findRecord('runAttempt', params.runAttemptId, {reload: true})
    },
    setupController(controller, model) {
        this._super(...arguments)
        controller.set("course", model.get('run.course'))
        controller.set("sections", model.get("run.sections"))
    }
});
