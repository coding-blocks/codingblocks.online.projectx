import Component from "@ember/component";
import env from "codingblocks-online/config/environment";
import { inject as service } from '@ember/service';
import { action } from "@ember/object";
import { getPublicUrl } from "codingblocks-online/utils/browser"


export default class LoginButton extends Component {
  @service api;
  @service session;
  @service currentUser;
  @service store;
  @service router;

  tagName = 'span'
  loginUrl = `${env.oneauthURL}/oauth/authorize?response_type=code&client_id=${
    env.clientId
  }&redirect_uri=${getPublicUrl()}`;

  @action
  invalidateSession() {
    let logout = () => {
      this.get("api")
      .request("/jwt/logout")
      .then(() => {
        this.get("session").invalidate()
      });
    }

    let timeout = setTimeout (logout, 4000)

    try {
      OneSignal.getUserId ()
        .then (userId => {
          clearTimeout (timeout)

          if (! userId) {
            return
          }

          return this.get ('store').queryRecord ('player', {
            playerId: userId,
            custom: {
              ext: 'url',
              url: 'me'
            }
          })
        })
        .then ((player) => {
          if (! player) {
            return
          }

          return player.destroyRecord ()
        })
        .then (() => {
          logout ()
        })
    }
    catch (error) {
      console.error (error)
    }
    const logoutUrl = env.oneauthURL + '/logout?redirect=' + env.publicUrl + 'app/logout' 
    window.location.href = logoutUrl
  }

  @action
  logIn () {
    localStorage.setItem('redirectionPath', this.get('router.currentURL').replace("/app", "/"))
    window.location.href = this.get('loginUrl')
  }
}
