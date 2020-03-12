import Component from '@ember/component';
import { action } from '@ember/object';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class SubmissionComponent extends Component {
  @service hbApi
  @service player
  @service store

  submissionToView = null
  viewSubmissionCode = false

  @restartableTask fetchSubmissionsTask = function *() {
    const runAttempt = this.store.peekRecord('run-attempt', this.player.runAttemptId)
    return this.hbApi.request('submissions', {
      data: {
        filter: {
          contest_id: runAttempt.get("run.contestId"),
          content_id: this.codeChallenge.get("hbContentId")
        },
        sort: '-createdAt'
      }
    }).then(submissions => {
      this.store.unloadAll('submission')
      this.store.pushPayload(submissions)
      return this.store.peekAll('submission')
    })
  }

  @action
  viewSubmission(submission) {
    this.set('submissionToView', submission)
    this.set('viewSubmissionCode', true)
  }
}
