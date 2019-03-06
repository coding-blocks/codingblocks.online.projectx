import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default Route.extend({
  currentUser: service(),
  activate () {
    this._super(...arguments)
    this.currentUser.setOrg('nagarro');
    window.localStorage.setItem('org', 'nagarro')
  }
});
