import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';

export default Mixin.create(AuthenticatedRouteMixin, {
  router: service(),

  beforeModel () {
    localStorage.setItem('redirectionPath', this.get('router.currentURL') || window.location.pathname)
    return this._super(...arguments)
  }
})