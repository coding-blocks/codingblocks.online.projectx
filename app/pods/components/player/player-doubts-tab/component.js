import Component from '@ember/component';
import { filter } from '@ember/object/computed';
import { computed } from '@ember/object';

export default class DoubtsTab extends Component {
  // doubts
  @filter('doubts.@each.status', doubt => doubt.status === 'RESOLVED') resolved
  @filter('doubts.@each.status', doubt => doubt.status !== 'RESOLVED') unresolved

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
