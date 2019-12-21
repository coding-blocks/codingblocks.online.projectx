import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default class SpinLeaderboard extends Component {
  @service store

  @alias('fetchWinnersTask.lastSuccessful.value') winners

  didReceiveAttrs() {
    this.fetchWinnersTask.perform()
  }

  @restartableTask fetchWinnersTask = function *() {
    return yield this.store.query('spin', {
      include: 'user,spin_prize',
      custom: {
        ext: 'url',
        url: 'winners'
      }
    })
  }
}
