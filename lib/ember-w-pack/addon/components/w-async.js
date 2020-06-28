import Component from "@ember/component";
import { computed } from '@ember/object';
import layout from '../templates/components/w-async';

export default class WAsyncComponent extends Component {
  layout = layout
  
  didReceiveAttrs() {
    super.init(...arguments);
    if (this.autoFire) this.task.perform();
  }

  @computed('task.{isRunning,last.value}')
  get showLoader() {
    const { task } = this
    return task.isRunning && !task.last.value
  }
}
