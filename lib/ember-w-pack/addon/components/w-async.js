import Component from "@ember/component";
import layout from '../templates/components/w-async';

export default class WAsyncComponent extends Component {
  layout = layout
  
  didReceiveAttrs() {
    this._super(...arguments);
    if (this.autoFire) this.task.perform();
  }
}
