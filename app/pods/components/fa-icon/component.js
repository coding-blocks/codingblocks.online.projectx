import Component from '@ember/component';
import { computed } from '@ember/object';

export default class FaIcon extends Component {
  // fas fa-{{icon}} fa-{{or size "1"}}x
  tagName = 'i'
  classNameBindings = ['type', 'iconClass', 'sizeClass']
  type = 'fas'
  size = 1
  
  @computed('size')
  get sizeClass() {
    return 'fa-' + this.size + 'x';
  }
  @computed('icon')
  get iconClass() {
    return 'fa-' + this.icon
  }
}
