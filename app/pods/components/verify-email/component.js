import Component from '@ember/component';
import { action } from "@ember-decorators/object";
import { inject as service } from '@ember-decorators/service';

export default class VerifyEmailComponent extends Component {
  @service session
  @service router

  @action
  retryLogin() {
    this.session.invalidate()
      .then(() => {
        localStorage.setItem('redirectionPath', this.get('router.currentURL'))
        this.router.transitionTo('login')
      })
  }
}
