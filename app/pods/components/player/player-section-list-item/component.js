import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default class Selection extends Component {
  @service player

  @alias('player.contentId') contentId

  @action
  toggle() {
    this.toggleProperty('isOpen')
  }
}
