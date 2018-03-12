import Route from '@ember/routing/route';

export default Route.extend({
    model (params) {
        return this.store.findRecord('runAttempt', params.runAttemptId)
    },
    setupController(controller, model) {
        controller.set("course", model.get('run.course'))
    }
});
