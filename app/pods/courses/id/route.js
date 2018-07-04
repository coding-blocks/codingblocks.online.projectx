import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  headData: inject(),
  beforeModel () {
      window.scrollTo(0,0);
    },
    model (params) {
        return this.store.findRecord("course", params.courseId)
    },
    setupController(controller, model) {
        this._super(...arguments)
        controller.set("course", model)
    },
    afterModel(model) {
      this.set('headData.title', model.get('title'))
    }
 });
