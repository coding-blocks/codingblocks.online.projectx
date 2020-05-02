import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AskDoubtModal extends Component {
  @service onesignal

  @restartableTask saveDoubtTask = function *() {
    yield this.doubt.save()
    if (this.onAfterSave) {
      this.onAfterSave()
    }
  }

  @action
  onModalCloseGesture() {
    if (!this.doubt.isNew)
      this.onClose()
  }
}
