import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';

export default class Selection extends Component {
  @service player

  @alias('player.contentId') activeContentId
  @alias('player.sectionId') activeSectionId

  @computed('activeSectionId', 'section.id')
  get isActiveSection() {
    return this.activeSectionId == this.section.id
  }
  
  @action
  toggle() {
    this.toggleProperty('isOpen')
  }
}
