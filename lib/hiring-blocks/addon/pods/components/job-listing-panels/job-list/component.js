import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { action } from '@ember/object'
import { alias } from '@ember/object/computed';

export default class JobListComponent extends Component {
  @service store

  @alias('fetchJobsTask.lastSuccessful.value.meta.pagination') pagination

  offset = 0
  limit = 4
  jobs = []

  didReceiveAttrs () {
    this._super(...arguments)
    this.set('offset', 0)
    this.fetchJobsTask.perform()
  }

  @restartableTask fetchJobsTask = function *() {
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

    this.set('jobs', loadedJobs.toArray())

    return loadedJobs
  }

  @action
  paginate(page) {
    this.set("offset", (page - 1) * this.limit);
    this.fetchJobsTask.perform()
  }

}
