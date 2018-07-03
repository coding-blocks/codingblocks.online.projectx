import Route from '@ember/routing/route';

export default Route.extend({
    title: 'My Courses | CodingBlocksOnline',
    model () {
        return this.store.query('run', {
            enrolled: true
        })
    },
    setupController(controller, model) {
        this._super(...arguments)
        controller.set("runs", model)
    }
});
