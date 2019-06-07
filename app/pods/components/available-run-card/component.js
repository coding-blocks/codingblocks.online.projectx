import Component from '@ember/component';
import { alias, equal, or } from '@ember/object/computed'
import { inject as service } from '@ember/service'

export default class AvailableRunCardComponent extends Component {
  classNames = ['card-layout', 'col-md-4', 'col-sm-6']

  @service session

  @alias('run.course') course
  @equal('run.mrp', 0) isFree

  @or('course.organization', 'isFree') blockFreeTrial
}
