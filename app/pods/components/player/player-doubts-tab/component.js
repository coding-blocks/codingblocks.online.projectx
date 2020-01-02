import Component from '@ember/component';
import { filterBy, filter } from '@ember/object/computed';
import { computed } from '@ember/object';

export default class DoubtsTab extends Component {
  // doubts
  @filterBy('doubts', 'status', 'RESOLVED') resolved
  @filter('doubts', doubt => doubt.status !== 'RESOLVED') unresolved

  @computed('filter')
  get doubtsList() {
    switch(this.filter) {
      case 'all': return this.doubts
      case 'resolved': return this.resolved
      case 'unresolved': return this.unresolved
    }
  }

  didReceiveAttrs() {
    this.set('filter', 'all')
  }
}
