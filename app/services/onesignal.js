import Service from '@ember/service';
import config from 'codingblocks-online/config/environment';
import { inject as service } from '@ember/service';

export default class OnesignalService extends Service {
  @service store

  isSubscribed = false

  constructor() {
    super(...arguments)
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(() => {
      OneSignal.init({
        allowLocalhostAsSecureOrigin: config.environment === 'development',
        appId: config.OnesignalAppId
      })

      OneSignal.getSubscription().then(state => this.set('isSubscribed', state))
    })

    OneSignal.push(() => {
      OneSignal.on("subscriptionChange", async isSubscribed => {
        this.set('isSubscribed', isSubscribed)
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

  initializeCustomLinks() {
    window.OneSignal.initHelper.showPromptsFromWebConfigEditor()
  }
}