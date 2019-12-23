import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'codingblocks-online/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),

  beforeModel() {
    if (this.currentUser.user.roleId !== 1) {
      this.transitionTo('index')
    }
  }
});
