import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';

export default class Selection extends Component {
  @service player
  @service store

  @alias('player.contentId') activeContentId
  @alias('player.sectionId') activeSectionId

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
      const sectionPremium = this.section.premium
      const premiumCourse =  runAttempt.premium && !runAttempt.isExpired
      return !sectionPremium && !premiumCourse
    }
  }

  @action
  toggle() {
    this.toggleProperty('isOpen')
  }
}
