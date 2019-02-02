import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  runAttempt: service(),

  submissions: [],

  fetchSubmissionsTask: task(function * () {
    const submissions = yield this.get('store').query('csv-submission', {
      filter: {
        csvId: this.get('csvId'),
        runAttemptId: this.get('runAttempt.runAttemptId')
      },
      sort: '-createdAt'
    })
    this.set('submissions', submissions)
  }),

  init() {
    this._super(...arguments)
    this.get('fetchSubmissionsTask').perform()
  }

})