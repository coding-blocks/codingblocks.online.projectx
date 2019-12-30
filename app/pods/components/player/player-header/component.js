import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default class PlayerHeader extends Component {
  @service store
  @service player

  @computed('player.contentId')
  get content() {
    if (this.player.contentId) {
      return this.store.peekRecord('content', this.player.contentId)
    }
  }

  @computed('player.runAttemptId')
  get runAttempt() {
    if (this.player.runAttemptId) {
      return this.store.peekRecord('run-attempt', this.player.runAttemptId)
    }
  }

  @computed('runAttempt.progressPercent')
  get progressPercent() {
    if (this.runAttempt) {
      return this.runAttempt.progressPercent
    }
  }
}
