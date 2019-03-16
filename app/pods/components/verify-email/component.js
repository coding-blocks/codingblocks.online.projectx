import Component from '@ember/component';
import env from "codingblocks-online/config/environment";
import { action } from "@ember-decorators/object";
import { inject as service } from '@ember-decorators/service';

export default class VerifyEmailComponent extends Component {
  @service session

  loginUrl = `${env.oneauthURL}/oauth/authorize?response_type=code&client_id=${
    env.clientId
  }&redirect_uri=${window.location.href}`;

  @action
  retryLogin() {
    debugger
    this.session.invalidate()
      .then(() => {
        localStorage.setItem('redirectionPath', this.get('router.currentURL'))
        window.location.href = this.get('loginUrl')
      })
  }
}
