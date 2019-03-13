import Route from '@ember/routing/route';
import { inject as service } from '@ember-decorators/service'

export default class ListingJobRoute extends Route {
  @service store

  model ({ jobId }) {
    return this.store.findRecord('job', jobId)
  }

  setupController (controller, model) {
    controller.set('job', model)
  }
}
