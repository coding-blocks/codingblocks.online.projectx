import Component from "@ember/component";

export default class WAsyncComponent extends Component {
  didReceiveAttrs() {
    this._super(...arguments);
    if (this.autoFire) this.task.perform();
  }
}
