import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed'
import { action } from '@ember/object'

export default class JobCardsViewComponent extends Component {
  @service store

  offset = 0
  limit = 4
  jobs = []

  didReceiveAttrs () {
    this._super(...arguments)
    this.set('offset', 0)
    this.fetchJobsTask.perform(true)
  }

  @restartableTask fetchJobsTask = function *(truncate = false) {
    const filter = {
      deadline: {
        $gt: new Date()
      },
      postedOn: {
        $lte: new Date()
      }
    }

    filter.location = {
      $ilike: {
        $any: this.filters.locations
      }
    }

    filter.type = {
      $in: this.filters.jobTypes
    }

    if (this.filters.eligibility)
      filter.eligibilityStatus = this.filters.eligibility

    const loadedJobs = yield this.store.query('job', {
      filter,
      page: {
        offset: this.offset,
        limit: this.limit
      },
      sort: '-postedOn'
    })  

    // so that re-render (due to prop changes) is performed after we have data
    if (truncate) 
      this.set('jobs', loadedJobs.toArray())
    else
      this.jobs.addObjects(loadedJobs)

    return loadedJobs
  }

  @action
  loadMore () {
    this.incrementProperty("offset", this.limit)
    this.fetchJobsTask.perform()
  }

}
