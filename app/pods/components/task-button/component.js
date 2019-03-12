import Component from '@ember/component';
import { computed } from '@ember-decorators/object';

export default class TaskButtonComponent extends Component {
  tagName = 'button'

  idleText = null
  runningText = null

  attributeBindings = ['type', 'disabled']
  classNameBindings = ['task.isRunning:running']

  constructor () {
    super(...arguments)

    if (!!this.get('disabled')) {
      this.set('disabled', "disabled");
    }

    const runningClass = this.get('runningClass');

    if (runningClass) {
      this.set('classNameBindings', [`task.isRunning:${runningClass}`]);
    }
  }

  @computed('task.isRunning')
  get text () {
    const idleText    = this.get('idleText');
    const runningText = this.get('runningText');

    if (runningText && this.get('task.isRunning')) {
      return runningText;
    } else {
      return idleText;
    }
  }

}
