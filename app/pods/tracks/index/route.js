import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  model() {
    return this.store.query('career-track', {
      page: {
        limit: 3
      }
    })
  }

  setupController(controller, model) {
    controller.set('tracks', model)
  }
}
