import Component from "@ember/component";
import env from "codingblocks-online/config/environment";
import { service } from "ember-decorators/service";
import { action } from "ember-decorators/object";

export default class LoginButton extends Component {
  @service api;
  @service session;
  @service currentUser;
  @service store;
  @service raven;
  @service router;

  tagName = 'span'
  loginUrl = `${env.oneauthURL}/oauth/authorize?response_type=code&client_id=${
    env.clientId
  }&redirect_uri=${env.publicUrl}`;

  @action
  invalidateSession() {
    const logoutUrl = env.oneauthURL + '/logout?redirect=' + env.publicUrl + '/logout'
    window.location.href = logoutUrl
  }

  @action
  logIn () {
    localStorage.setItem('redirectionPath', this.get('router.currentURL'))
    window.location.href = this.get('loginUrl')
  }
}
