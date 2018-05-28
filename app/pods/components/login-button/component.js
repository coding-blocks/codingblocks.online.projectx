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

  tagName = 'span'
  loginUrl = `${env.oneauthURL}/oauth/authorize?response_type=code&client_id=${
    env.clientId
  }&redirect_uri=${env.publicUrl}`;

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
        .then ((_) => {
          logout ()
        })
    }
    catch (error) {
      this.get ('raven').captureException (error)
    }
  }

  @action
  logIn () {
    window.location.href = this.get('loginUrl')
  }
}
