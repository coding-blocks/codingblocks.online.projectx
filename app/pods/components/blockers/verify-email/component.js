import Component from '@ember/component';
import { action } from "@ember/object";
import { inject as service } from '@ember/service';

export default class VerifyEmailComponent extends Component {
  @service session
  @service router

  @action
  retryLogin() {
    this.session.invalidate()
      .then(() => {
        localStorage.setItem('redirectionPath', this.get('router.currentURL').replace("/app", "/"))
        this.router.transitionTo('login')
      })
  }
}
