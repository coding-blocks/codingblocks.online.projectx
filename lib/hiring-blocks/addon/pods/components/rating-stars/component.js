import Component from '@ember/component';
import layout from './template';
import { computed }  from '@ember/object';

export default class RatingStarsComponent extends Component {
  layout

  @computed('total')
  get totalStars () {
    return new Array(this.total).fill(0).map((el, index) => index)
  }
}
