import Component from '@ember/component';
import { action } from '@ember/object';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';

export default class SubmissionComponent extends Component {
  @service hbApi
  @service player
  @service store

  submissionToView = null
  viewSubmissionCode = false

  @restartableTask fetchSubmissionsTask = function *() {
    const runAttempt = this.store.peekRecord('run-attempt', this.player.runAttemptId)
    const submissions = yield this.hbApi.request('submissions', {
      data: {
        filter: {
          contest_id: runAttempt.get("run.contestId"),
          content_id: this.codeChallenge.get("hbContentId")
        },
        sort: '-createdAt'
      }
    })
    
    return new Promise((resolve) => {
      this.store.unloadAll('submission')
      later(() => {
        this.store.pushPayload(submissions)
        resolve(this.store.peekAll('submission'))
      })
    })
  }

  @action
  viewSubmission(submission) {
    this.set('submissionToView', submission)
    this.set('viewSubmissionCode', true)
  }
}
