import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class MunjalIndexRoute extends Route {
  @service currentUser;

  activate () {
    this.currentUser.setOrg('munjal');
    window.localStorage.setItem('org', 'munjal')
  }
}
