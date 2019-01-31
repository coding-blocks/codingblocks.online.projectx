import Component from '@ember/component';
import { alias } from "ember-decorators/object/computed";
import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';
import { task } from 'ember-concurrency';


export default class PlayerCsvComponent extends Component {
  classNames = ['h-100']
  submitSuccess = false

  @service store
  @service('run-attempt') runAttemptService
  
  @alias('payload') csv

  @action
  download (link) {
    const el = document.createElement('a')
    el.href = link
    el.download = ''
    el.target = '_blank'
    el.click()
  }

  @action
  onUploadComplete (link) {
    this.set('url', link)
  }

  submissionTask = task(function *() {
    if (!this.get('url')) {
      return alert('You must upload your solution first')
    }
    const store = this.get('store')

    const submission = store.createRecord('csv_submission', {
      outputUrl: this.get('url'),
      csv: this.get('csv'),
      runAttempt: store.peekRecord('run-attempt', this.get('runAttemptService.runAttemptId'))
    })

    yield submission.save()
    this.set('submitSuccess', true)
    this.set('currentSubmission', submission)
    this.set('url', null)
  })
}
