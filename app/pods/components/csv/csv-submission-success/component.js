import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default class CsvSubmissionSuccess extends Component {
  @service taskPoller

  didReceiveAttrs() {
    this.taskPoller.performPoll(
      () => this.submission.reload(),
      submission => !submission.get('isPending'),
      40
    )
  }
}
