import Route from '@ember/routing/route';

export default class CsvRoute extends Route {
  model() {
    return this.modeFor('attempt.content')
  }

  setupController(controller, model) {
    controller.set('content', model)
    controller.set('csv', model.payload)
  }
}
