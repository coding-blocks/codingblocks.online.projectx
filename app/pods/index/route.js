import Route from "@ember/routing/route";
import { later } from '@ember/runloop';

const ABSOLUTE_PATH_PREFIX = "absolute_path:"

/*
  redirectTarget: absolute_path:http://online.codingblocks.com/courses   // set by Nuxt (must be absolute path as these can't be resolved inside ember)
  redirectTarget: /app/classroom/  // can be resolved in ember, no need to reload entire page
*/
function handleRedirectionTarget (redirectTarget) {
  const isAbsolutePath = redirectTarget.startsWith(ABSOLUTE_PATH_PREFIX)
  if (isAbsolutePath) {
    window.location.href = redirectTarget.replace(ABSOLUTE_PATH_PREFIX, "")
  } else {
    later(() => { this.transitionTo(redirectTarget, { code: null }) })
  }
}

export default Route.extend({
  model() {
    const redirectTarget = window.localStorage.getItem('redirectionPath')
    if (redirectTarget && redirectTarget != '/') {
      handleRedirectionTarget.call(this, redirectTarget)
      window.localStorage.removeItem('redirectionPath')
    } else {
      this.transitionTo('dashboard')
    }
  }
})
