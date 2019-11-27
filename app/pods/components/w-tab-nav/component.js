import Component from '@ember/component';
import { later } from '@ember/runloop';

export default class TabNavComponent extends Component {
  constructor() {
    super(...arguments)
    // first tab is active, if no activeTab is provided
    if (!this.activeTab) {
      later(() => {
        this.onTabChange(this.tabs.firstObject)
      })
    }
  }
}
