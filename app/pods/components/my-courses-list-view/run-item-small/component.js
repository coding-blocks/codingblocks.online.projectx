import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default class RunItemSmall extends Component {
  @service api

  @alias('fetchProgressTask.lastSuccessful.value') progress

  didReceiveAttrs() {
    this.fetchProgressTask.perform()
  }

  @restartableTask fetchProgressTask = function *() {
    return yield this.get('api').request(`run_attempts/${this.get('run.topRunAttempt.id')}/progress`)
  }
}
