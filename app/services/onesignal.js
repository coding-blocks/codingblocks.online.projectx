import Service from '@ember/service';
import config from 'codingblocks-online/config/environment';
import { inject as service } from '@ember/service';

export default class OnesignalService extends Service {
  @service store

  constructor() {
    super(...arguments)
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function() {
      OneSignal.init({
        allowLocalhostAsSecureOrigin: config.environment === 'development',
        appId: config.OnesignalAppId
      })
    })

    OneSignal.push(() => {
      OneSignal.on("subscriptionChange", async isSubscribed => {
        if (!isSubscribed) 
          return;
        
        const playerId = await OneSignal.getUserId();
        const player = this.store.createRecord("player", {
          playerId
        })
        await player.save();
      })
    })
  }

  // sets externalId on this user
  setExternalId(oneauthId) {
    if (OneSignal && typeof OneSignal.setExternalUserId === 'function') {
      OneSignal.setExternalUserId(oneauthId)
    }
  }
}