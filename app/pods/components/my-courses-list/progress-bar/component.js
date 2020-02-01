import Component from '@ember/component';
import { computed } from '@ember/object';

export default class MyCoursesListProgressBarComponent extends Component {
  @computed('percent')
  get progressBarClass() {
    return this.percent >= 90 ? 'progress-green' : 'progress-orange'
  }
}
