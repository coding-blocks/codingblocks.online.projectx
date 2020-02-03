import Component from '@ember/component';
import { action } from '@ember/object';

export default class SubmissionComponent extends Component {
  submissionToView = null
  viewSubmissionCode = false

  @action
  viewSubmission(submission) {
    this.set('submissionToView', submission)
    this.set('viewSubmissionCode', true)
  }
}
