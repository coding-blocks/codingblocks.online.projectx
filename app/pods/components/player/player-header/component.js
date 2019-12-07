import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import DS from 'ember-data';

export default class PlayerHeader extends Component {
  @service api
  @service store
  @service player

  @computed('player.contentId')
  get content() {
    if (this.player.contentId) {
      return this.store.peekRecord('content', this.player.contentId)
    }
  }

  @computed('player.contentId')
  get progress() {
    if (this.player.runAttemptId) {
      return DS.PromiseObject.create({
        promise: this.api.request(`run_attempts/${this.player.runAttemptId}/progress`)
      })
    }
  }
}
