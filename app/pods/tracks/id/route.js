import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { capitalize } from '@ember/string';


export default class Track extends Route {
  @service headData

  model(params) {
    return this.store.findRecord('career-track', params.slug)
  }

  afterModel(model) {
    this.headData.set('title', 'Career Tracks | ' + capitalize(model.name))
  }

  setupController(controller, model) {
    controller.set('track', model)
    controller.set('courses', model.courses)
  }
}
