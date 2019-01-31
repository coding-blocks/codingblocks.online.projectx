import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  taskPoller: service(),
  init () {
    this._super(...arguments)

    // get a polling task for polling submission
    const task = this.get('taskPoller').getPollTask(
      () => this.get('submission').reload(),
      result => !result.get('isPending')
    )

    // it is important to set it as property of this component, so that it can hook onto lifecycle
    this.set('pollingTask', task)

    // start polling
    this.get('pollingTask').perform()
  }
});
