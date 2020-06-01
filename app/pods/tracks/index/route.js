import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service headData

  model() {
    return this.store.query('career-track', {
      page: {
        limit: 10
      }
    })
  }

  afterModel(model) {
    this.headData.set('title', 'Coding Blocks Online | Career Tracks')
  }

  setupController(controller, model) {
    controller.set('tracks', model)
  }
}
