import Route from '@ember/routing/route';
import { inject } from '@ember/service'

export default Route.extend({
    headData: inject(),
    model () {
        return this.store.query('run', {
            enrolled: true,
            include: 'course,run_attempts'
        })
    },
    setupController(controller, model) {
        this._super(...arguments)
        controller.set("runs", model)
    },
    afterModel(model) {
      this.set('headData.title', 'Coding Blocks Online | My Courses')
    }
});
