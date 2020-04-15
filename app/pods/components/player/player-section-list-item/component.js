import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';

export default class Selection extends Component {
  @service player
  @alias('player.contentId') activeContentId
  @alias('player.sectionId') activeSectionId
  @service store;
  @computed('activeSectionId', 'section.id')
  get isActiveSection() {

    return this.activeSectionId == this.section.id
  }

  @computed('player.runAttemptId')
  get runAttemptPremium() {
    if (this.player.runAttemptId) {
      const run_attempt = this.store.peekRecord('run-attempt', this.player.runAttemptId)
      const not_expired = run_attempt.end > Date.parse(moment())/1000
      return run_attempt.premium && not_expired
    }
  }

  @action
  toggle() {
    this.toggleProperty('isOpen')
  }
}
