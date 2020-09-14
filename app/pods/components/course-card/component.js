import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object'
import { bool } from '@ember/object/computed'

export default class CourseCardComponent extends Component {
  @service session
  @service domain
  @service metrics
  @service currentUser

  @bool("currentUser.organization") isOrgView;

  didInsertElement () {
    this._super(...arguments)
    this.element.addEventListener('click', e => {
      e.stopPropagation()
    })
  }

  @action
  log(event, title) {
    this.get('metrics').trackEvent({event, title, page: 'courses'})
  }


}
