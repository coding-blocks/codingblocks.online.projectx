import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';

export default class AskDoubtModal extends Component {
  @restartableTask saveDoubtTask = function *() {
    yield this.doubt.save()
    if (this.onAfterSave) {
      this.onAfterSave()
    }
    return this.onClose()
  }
}
