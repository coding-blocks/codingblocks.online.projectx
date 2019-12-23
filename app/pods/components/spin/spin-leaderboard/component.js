import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { action } from '@ember/object';

export default class SpinLeaderboard extends Component {
  @service store

  @alias('fetchWinnersTask.lastSuccessful.value') winners

  limit = 5
  offset = 0

  didReceiveAttrs() {
    this.fetchWinnersTask.perform()
  }

  @restartableTask fetchWinnersTask = function *() {
    return yield this.store.query('spin', {
      include: 'user,spin_prize',
      page: {
        limit: this.limit,
        offset: this.offset
      },
      custom: {
        ext: 'url',
        url: 'winners'
      }
    })
  }

  @action
  setOffset(offset) {
    this.set('offset', offset)
    this.fetchWinnersTask.perform()
  }
}
