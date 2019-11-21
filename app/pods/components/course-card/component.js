import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object'


export default class CourseCardComponent extends Component {
  @service session
  @service domain
  @service metrics

  didInsertElement () {
    this._super(...arguments)
    this.element.addEventListener('click', e => {
      e.stopPropagation()
    })
  }

  @action
  log(event, title) {
    this.get('metrics').trackEvent({event, title})
  }


}
