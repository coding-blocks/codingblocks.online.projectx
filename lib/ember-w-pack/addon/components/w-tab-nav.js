import Component from '@ember/component';
import { later } from '@ember/runloop';
import layout from '../templates/components/w-tab-nav';


export default class TabNavComponent extends Component {
  layout = layout
  inactiveClass = ''
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
