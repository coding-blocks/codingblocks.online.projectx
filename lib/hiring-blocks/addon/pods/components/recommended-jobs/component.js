import Component from '@ember/component';
import layout from './template';
import { restartableTask } from "ember-concurrency-decorators";
import { inject as service } from '@ember/service';

export default class RecommendedJobsComponent extends Component {
  layout

  @service store

  @restartableTask fetchJobs = function* ()  {
    return this.store.query('job', {
      page: {
        limit: 2
      },
      sort: 'id'
    })
  }

  didReceiveAttrs () {
    this._super(...arguments)
    this.fetchJobs.perform()
  }
}
