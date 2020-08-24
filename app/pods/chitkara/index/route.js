import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ChitkaraIndexRoute extends Route {
  @service currentUser;
  
  activate () {
    this.currentUser.setOrg('chitkara');
    window.localStorage.setItem('org', 'chitkara')
  }
}
