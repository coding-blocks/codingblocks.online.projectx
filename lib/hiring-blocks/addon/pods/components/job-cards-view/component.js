import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember-decorators/service';
import { alias } from '@ember-decorators/object/computed'

export default class JobCardsViewComponent extends Component {
  @service store

  @alias ('fetchJobsTask.lastSuccessful.value') jobs

  didReceiveAttrs () {
    this._super(...arguments)
    this.fetchJobsTask.perform()
  }

  @restartableTask
  *fetchJobsTask () {
    return this.store.query('job', {
      filter: this.filters
    })

  }

}
