import Route from '@ember/routing/route';

export default Route.extend({
    beforeModel () {
      window.scrollTo(0,0);
    },
    model (params) {
        return this.store.findRecord("course", params.courseId)
    },
    serialize (model) {
        return { courseId: model.get('slug') || model.id }
    },
    setupController(controller, model) {
        this._super(...arguments)
        controller.set("course", model)
    }
 });
