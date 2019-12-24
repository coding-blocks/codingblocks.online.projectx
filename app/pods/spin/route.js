import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'codingblocks-online/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),

  actions: {
    willTransition () {
      window.setTimeout( () => jivo_init(), 5000)
    },
    didTransition () {
      jivo_init();
    }
  }
});
