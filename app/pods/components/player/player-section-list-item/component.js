import Component from '@ember/component';
import { action } from '@ember/object';

export default class Selection extends Component {
  @action
  toggle() {
    this.toggleProperty('isOpen')
  }
}
