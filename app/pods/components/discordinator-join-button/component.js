import Component from '@ember/component';
import ENV from 'codingblocks-online/config/environment';
import { restartableTask } from 'ember-concurrency-decorators';

export default class DiscordinatorComponent extends Component {
  shouldJoinDiscord = false;

  didReceiveAttrs() {
    this.fetchDiscordSynced.perform();
  }

  get redirectUrl() {
    return ENV.discordinatorUrl + `/app/connect?redirectTo=${window.location.href}`
  }

  @restartableTask fetchDiscordSynced = function *() {
    const resp = yield fetch(ENV.discordinatorUrl + '/app/me', {
      credentials: 'include',
      mode: 'cors'
    });

    if (!resp.ok) return this.set('shouldJoinDiscord', false);

    const { user } = yield resp.json();

    return this.set('shouldJoinDiscord', !user || !user.discordId);
  }
}
