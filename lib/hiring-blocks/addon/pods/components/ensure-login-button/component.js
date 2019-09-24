import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default class EnsureLoginButtonComponent extends Component {
  @service session
  @service parentRouter

  tagName = 'button'

  click () {
    
    if (this.get('session.isAuthenticated')) {
      if (typeof this.action == 'function') 
        return this.action()
    } else {
      localStorage.setItem('redirectionPath', this.get('parentRouter.currentURL').replace("/app", "/"))
      this.parentRouter.transitionTo('login')
    }

  }
}
