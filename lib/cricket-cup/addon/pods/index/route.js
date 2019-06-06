import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default class ListingJobRoute extends Route {
  @service store
  @service session

  beforeModel() {
    if (!this.get('session.isAuthenticated'))
      return this.transitionToExternal('login')
  }

  model(){
    return this.store.findAll('cricket-cup-match', {
      custom: { ext: 'url', url: '/today'}
    })
  }
};
