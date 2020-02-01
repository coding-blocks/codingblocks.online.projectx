import Route from '@ember/routing/route';

export default class LectureRoute extends Route {
  queryParams = {
    start: {
      replace: true
    }
  }

  model() {
    return this.modelFor('attempt.content')
  }

  setupController(controller, model) {
    controller.set('content', model)
    controller.set('lecture', model.payload)
  }
}
