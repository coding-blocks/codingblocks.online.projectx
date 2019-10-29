import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  api: service('api'),
  headData: service(),
  model() {
    return this.modelFor('classroom.timeline').get('run.course');
  },
  setupController(controller, model) {
    controller.set('course', model);
  },
  afterModel(model) {
    this.set('headData.title', model.get('title'));
  },
});
