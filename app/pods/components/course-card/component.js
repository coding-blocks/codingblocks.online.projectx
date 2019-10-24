import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default class CourseCardComponent extends Component {
  @service session
  @service domain

  didInsertElement () {
    this._super(...arguments)
    this.element.addEventListener('click', e => {
      e.stopPropagation()
    })
  }
}
