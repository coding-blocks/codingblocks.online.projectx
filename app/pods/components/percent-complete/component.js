import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { service } from 'ember-decorators/service';

export default class PercentComplete extends Component {
  @service api

  percent = 0
  tagName = 'span'

  fetchPercentTask = task(function * () {
    const response = yield this.get('api').request(`run_attempts/${this.get('runAttemptId')}/progress`)
    this.set('percent', response.percent)
  })

  constructor () {
    super(...arguments)
    this.get('fetchPercentTask').perform()
  }
  
}
