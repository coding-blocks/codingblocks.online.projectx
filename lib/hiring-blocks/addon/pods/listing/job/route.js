import Route from '@ember/routing/route';
import { inject as service } from '@ember-decorators/service'

export default class ListingJobRoute extends Route {
  @service store
  @service session
  
  beforeModel () {
    if(!this.get('session.isAuthenticated'))
      return this.transitionToExternal('login')
  }

  model ({ jobId }) {
    return this.store.findRecord('job', jobId)
  }

  setupController (controller, model) {
    controller.set('job', model)
  }
}
