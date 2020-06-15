import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
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
