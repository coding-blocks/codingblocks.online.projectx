import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ENV from 'codingblocks-online/config/environment';

export default class ListingJobRoute extends Route {
  @service store
  @service session

  activate () {
    window.scrollTo(0, 0)
  }
  
  beforeModel (transition) {
    window.location = ENV.hiringblocksUrl + '/jobs/' + transition.to.params.jobId
    transition.abort()
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
