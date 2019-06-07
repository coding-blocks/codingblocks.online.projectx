import Component from '@ember/component';
import { timeout } from "ember-concurrency";
import { restartableTask } from 'ember-concurrency-decorators';

export default class extends Component{
  maxTries = 10
  gap = 2000

  didReceiveAttrs () {
    this._super(...arguments)
    // start polling
    this.pollingTask.perform()
  }

  @restartableTask pollingTask = function *() {
    while (this.maxTries--) {
      yield timeout(this.gap)
      const result = yield this.submission.reload()
      if (!result.get('isPending')) return result;
    }

    throw new Error('TIMEOUT')
  }
}
