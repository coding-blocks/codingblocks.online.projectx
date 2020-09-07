import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SaitmIndexRoute extends Route {
  @service currentUser;
  
  activate () {
    this.currentUser.setOrg('saitm');
    window.localStorage.setItem('org', 'saitm')
  }
}
