import Component from '@ember/component';
import { scheduleOnce } from '@ember/runloop';
import { action } from '@ember/object';
import layout from './template';

export default class Trigger extends Component {
  layout = layout

  @action
  openChanged(_el, [isOpen]) {
    if (isOpen === false && this._lastIsOpen === true) {
      scheduleOnce('actions', null, this.select.actions.search, '');
    }
    this._lastIsOpen = isOpen;
  }

  @action
  chooseOption(e) {
    if (e.target === null) return;
    let selectedIndex = e.target.getAttribute('data-selected-index');
    if (selectedIndex) {
      let numericIndex = parseInt(selectedIndex, 10);
      e.stopPropagation();
      e.preventDefault();
      let object = this.selectedObject(this.args.select.selected, numericIndex);
      this.args.select.actions.choose(object);
    }
  }
}
