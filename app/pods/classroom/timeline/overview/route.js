import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  api: service('api'),
  headData: service(),
  model (params) {
    return this.modelFor('classroom.timeline')
  },
  setupController (controller, model) {
    controller.set('course', model.get('run.course'))
    controller.set('runAttempt', model)
  },
  afterModel(model) {
    this.set('headData.title', model.get('title'))
  }
});
