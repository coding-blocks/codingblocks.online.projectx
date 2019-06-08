import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default class CourseCardComponent extends Component {
  @service session

  didInsertElement () {
    this._super(...arguments)
    this.element.addEventListener('click', e => {
      e.stopPropagation()
    })
  }
}
