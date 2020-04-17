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
  get premiumStudent() {
    const { runAttemptId } = this.player
    if (!runAttemptId) {
      return false
    }else{
      const runAttempt = this.store.peekRecord('run-attempt', runAttemptId)
      return runAttempt.premium && !runAttempt.isExpired
    }
  }

  @action
  toggle() {
    this.toggleProperty('isOpen')
  }
}
