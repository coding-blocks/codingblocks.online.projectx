import Route from '@ember/routing/route';

export default class VideoRoute extends Route {
  model() {
    return this.modelFor('attempt.content')
  }

  setupController(controller, model) {
    controller.set('content', model)
    controller.set('video', model.payload)
  }
}
