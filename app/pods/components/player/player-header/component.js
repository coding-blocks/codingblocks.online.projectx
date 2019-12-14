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

  @alias('run.topRunAttempt.progressPercent')
  progressPercent
}
