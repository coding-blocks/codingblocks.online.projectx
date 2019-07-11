import Service from '@ember/service'
import { task } from 'ember-concurrency-decorators'
import { timeout } from 'ember-concurrency'

export default class TaskPollerService extends Service {
  constructor() {
    super(...arguments)
    this.performPoll = this.performPoll.bind(this)
  }

  /**
   * The actual ember concurrency task
   * @param {function} fn – The function to execute
   * @param {*} condition – Condition to check for upon which it stops polling
   * @param {*} maxTries – The max amount of tries after which it stops polling
   * @param {*} gap – Sets the gap between every request
   * @returns {Promise<object>} result – Return the poller task result
   */

  @task
  pollerTask = function*(fn, condition, maxTries, gap) {
    while (maxTries--) {
      yield timeout(gap)
      const result = yield fn()
      if (condition(result)) return result;
    }

    throw new Error('TIMEOUT');
  }
  
  /**
   * Queues the ember concurrency task
   * @param {function} fn – The function to execute
   * @param {*} condition – Condition to check for upon which it stops polling
   * @param {*} maxTries – The max amount of tries after which it stops polling
   * @param {*} gap – Sets the gap between every request
   * @returns {Promise<object>} result – Return the poller task result
   */
  performPoll(fn, condition, maxTries = 10, gap = 2000) {
    if (typeof condition !== 'function') {
      throw new Error('The Exit Condition to poll must be function! Got: ', typeof condition)
    }

    return Promise.resolve(this.pollerTask.perform(fn, condition, maxTries, gap));
  }

}