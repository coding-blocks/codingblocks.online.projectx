import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { capitalize } from '@ember/string';

export default class Track extends Route {
  @service headData
  @service metrics

  model(params) {
    return this.store.findRecord('career-track', params.slug)
  }

  afterModel(track) {
    this.headData.set('title', 'Career Tracks | ' + capitalize(track.name))
    this.metrics.trackEvent({
      action: 'view',
      category: 'track',
      label: track.name,
      value: track.id
    })
  }

  setupController(controller, track) {
    controller.set('track', track)
    controller.set('courses', track.courses)
  }
}
