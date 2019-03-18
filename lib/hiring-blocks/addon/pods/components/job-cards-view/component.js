import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember-decorators/service';
import { alias } from '@ember-decorators/object/computed'
import { action } from '@ember-decorators/object'

export default class JobCardsViewComponent extends Component {
  @service store

  @alias ('fetchJobsTask.lastSuccessful.value') jobs
  
  limit = 10

  didReceiveAttrs () {
    this._super(...arguments)
    this.fetchJobsTask.perform()
    this.set('limit', 10)
  }

  @restartableTask
  *fetchJobsTask () {
    const filter = {}

    filter.location = {
      $in: this.filters.locations
    }

    filter.type = {
      $in: this.filters.jobTypes
    }

    if (this.filters.eligibility)
      filter.eligibilityStatus = this.filters.eligibility

    return this.store.query('job', {
      filter,
      page: {
        limit: this.limit
      }
    })

  }

  @action
  loadMore () {
    this.incrementProperty("limit", 10)
    this.fetchJobsTask.perform()
  }

}
