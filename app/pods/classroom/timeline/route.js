import Route from '@ember/routing/route';

export default Route.extend({
    model (params) {
        return this.store.findRecord('run', params.runId)
    },
    setupController (controller, model) {
        controller.set("run", model)
    }
});
