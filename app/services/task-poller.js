import Service from '@ember/service'
import { task, timeout } from 'ember-concurrency'

export default class TaskPollerService extends Service {

  getPollTask(fn, condition, maxTries = 10, gap = 2000) {
    if (typeof condition !== 'function') {
      throw new Error('The Exit Condition to poll must be function! Got: ', typeof condition)
    }

    const pollingTask = task(function* () {
      while (maxTries--) {
        yield timeout(gap)
        const result = yield fn()
        if (condition(result)) return result;
      }

      throw new Error('TIMEOUT')
    })

    return pollingTask
  }

}