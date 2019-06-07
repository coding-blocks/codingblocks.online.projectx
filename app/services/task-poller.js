import Service from '@ember/service'
import { task } from 'ember-concurrency-decorators'
import { timeout } from 'ember-concurrency'

export default class TaskPollerService extends Service {
  constructor() {
    super(...arguments)
    this.performPoll = this.performPoll.bind(this)
  }

  @task 
  *pollerTask(fn, condition, maxTries, gap) {
    while (maxTries--) {
      yield timeout(gap)
      const result = yield fn()
      if (condition(result)) return result;
    }

    throw new Error('TIMEOUT')
  }
  
  performPoll(fn, condition, maxTries = 10, gap = 2000) {
    if (typeof condition !== 'function') {
      throw new Error('The Exit Condition to poll must be function! Got: ', typeof condition)
    }

    return Promise.resolve(this.pollerTask.perform(fn, condition, maxTries, gap));
  }

}