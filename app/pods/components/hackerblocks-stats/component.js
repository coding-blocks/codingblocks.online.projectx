import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class HackerblocksStats extends Component {
  @service api

  @restartableTask fetchHackerblocksStats = function *() {
    return yield this.api.request('/hb/performance')
  }
}
