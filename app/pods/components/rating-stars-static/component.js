import Component from '@ember/component';
import { service } from 'ember-decorators/service'

export default class RatingComponentStatic extends Component {
  @service api

  didReceiveAttrs () {
    this._super(...arguments)
    this.get('api').request('/courses/' + this.get('course.id') + '/rating')
    .then(response => {
      this.set('rating', response.rating)
    })
  }
}