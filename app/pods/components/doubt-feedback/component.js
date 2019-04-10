import Component from '@ember/component'
import { restartableTask } from 'ember-concurrency-decorators'
import { inject as service } from '@ember-decorators/service';

export default class DoubtFeedbackComponent extends Component {
  @service store

  @restartableTask	
  *submitFeedback() {
    const df = this.store.createRecord('doubt-feedback', {
      type: 'STUDENT',
      score: this.score,
      description: this.description,
      doubt: this.doubt
    })

    yield df.save()
  }
}
