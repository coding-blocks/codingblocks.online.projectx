import Route from '@ember/routing/route';

export default class Track extends Route {
  model(params) {
    return this.store.findRecord('career-track', params.slug)
  }

  setupController(controller, model) {
    controller.set('track', model)
    controller.set('courses', model.courses)
  }
}
