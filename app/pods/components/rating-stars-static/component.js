import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default class RatingComponentStatic extends Component {
  @service api

  tagName='span'
  className='rating'
}
