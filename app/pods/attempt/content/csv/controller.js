import Controller from '@ember/controller';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class CsvController extends Controller {
  @service store
  @service player

  tabs = [
    {
      name: 'Problem',
      component: 'csv/csv-explanation'
    },
    {
      name: 'Downloads',
      component: 'csv/csv-downloads'
    },
    {
      name: 'Submissions',
      component: 'csv/csv-submissions'
    },
    {
      name: 'Leaderboard',
      component: 'csv/csv-leaderboard'
    }
  ]

  @restartableTask submissionTask = function *() {
    if (!this.url) {
      return alert('You must upload your solution first')
    }
    const store = this.get('store')

    const submission = store.createRecord('csv_submission', {
      outputUrl: this.url,
      csv: this.csv,
      runAttempt: store.peekRecord('run-attempt', this.player.runAttemptId)
    })

    yield submission.save()
    this.set('submitSuccess', true)
    this.set('currentSubmission', submission)
    this.set('url', null)
  }
}
