import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BMLIndexRoute extends Route {
  @service currentUser;

  activate () {
    this.currentUser.setOrg('bml');
    window.localStorage.setItem('org', 'bml')
  }
}
