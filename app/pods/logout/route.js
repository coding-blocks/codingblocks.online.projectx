import Route from '@ember/routing/route';
import { service } from "ember-decorators/service";

export default class LogoutRoute extends Route {
  @service api;
  @service store;
  @service session;


  afterModel () {
    let logout = () => {
      return this.get("api")
      .request("/jwt/logout")
      .then(() => {
        this.get("session").invalidate()
      });
    }

    let timeout = setTimeout (logout, 4000)

    try {
      return OneSignal.getUserId ()
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
          return logout ()
        })
    }
    catch (error) {
      this.get ('raven').captureException (error)
      return logout()
        .then(() => this.transitionTo('index'))
    }

  }
}
