import Route from "@ember/routing/route";
import { later } from '@ember/runloop';

export default Route.extend({
  model() {
    const redirectTarget = window.localStorage.getItem('redirectionPath')
    if (redirectTarget && redirectTarget != '/') {
      later(() => { this.transitionTo(redirectTarget, { code: null }) })
      window.localStorage.removeItem('redirectionPath')
    } else {
      this.transitionTo('dashboard')
    }
  }
})
