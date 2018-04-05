import Route from '@ember/routing/route';

export default Route.extend({
    model (params) {
        return this.store.queryRecord('run-attempt', {
            runId: params.runId
        }).then(runAttempt => {
            return this.store.findRecord('run-attempt', runAttempt.get('id'), {reload: true})
        })
    },
    setupController (controller, model) {
        controller.set("run", model.get("run"))
        controller.set("runAttempt", model)
       // controller.set("course", model.get("topRunAttempt.run.course"))
    },
    actions: {
        reloadRoute () {
            this.refresh()
        },
    }
});
