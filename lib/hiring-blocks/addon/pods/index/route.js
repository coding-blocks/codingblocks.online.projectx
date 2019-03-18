import Route from '@ember/routing/route';
import { inject as service } from '@ember-decorators/service';

export default class IndexRoute extends Route {
  @service session

  afterModel() {
    if(this.get('session.isAuthenticated')) {
      this.transitionTo('listing')
    }
  }
}
