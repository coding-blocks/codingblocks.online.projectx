import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';

export default Mixin.create(AuthenticatedRouteMixin,{
  router: service(),
  session: service(),

  beforeModel(transition) {
    // not calling this._super on purpose; we use our own redirectionPath

    if (this.session.isAuthenticated) {
      return;
    }

    const redirectionPath = localStorage.getItem('redirectionPath')
    if (!this.session.isAuthenticated && !redirectionPath && redirectionPath != '/') {
      const newRedirectionPath = (transition.intent.url || window.location.pathname).replace("/app", "")
      if (newRedirectionPath != '/')
        localStorage.setItem('redirectionPath', newRedirectionPath)
    }
    
    this.transitionTo('login')
  }
})