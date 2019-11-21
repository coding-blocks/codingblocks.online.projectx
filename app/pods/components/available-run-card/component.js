import Component from '@ember/component';
import { alias, equal, or } from '@ember/object/computed'
import { inject as service } from '@ember/service'
import { action } from '@ember/object'

export default class AvailableRunCardComponent extends Component {
  @service metrics
  classNames = ['card-layout', 'col-md-4', 'col-sm-6']

  @service session

  @alias('run.course') course
  @equal('run.mrp', 0) isFree

  @or('course.organization', 'isFree') blockFreeTrial

  @action
  log(event, title) {
    this.get('metrics').trackEvent({event, title})
  }
}
