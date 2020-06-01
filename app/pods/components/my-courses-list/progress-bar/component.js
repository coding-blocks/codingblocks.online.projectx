import Component from '@ember/component';
import { computed } from '@ember/object';

export default class MyCoursesListProgressBarComponent extends Component {
  @computed('percent', 'color')
  get progressBarClass() {
    switch (this.color) {
      case 'grey': return '';
      default:
        return this.percent >= 90 ? 'progress-green' : 'progress-orange'
    }
  }
}
