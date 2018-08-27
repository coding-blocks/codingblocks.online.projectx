import Component from '@ember/component'
import { action, computed } from 'ember-decorators/object'
import { alias } from 'ember-decorators/object/computed'
import { service } from 'ember-decorators/service'

/* props
    course: {
        type: course
    }
*/
export default class RatingStartComponent extends Component {
  @service api

  scale = 5
  ratingMarkedByUser = null
  isEditing = false
  isShowingModal = false

  constructor () {
    super(...arguments)
    this.set('hasUserMarkedRating', false)
  }

  didReceiveAttrs () {
    this._super(...arguments)
    if (this.get('initialRating')) {
      this.set('hasUserMarkedRating', true)
      this.set('ratingMarkedByUser', this.get('initialRating.value'))
      this.set('rating', this.get('initialRating.value'))
      this.set('textExperience', this.get('initialRating.heading'))
      this.set('textPublic', this.get('initialRating.review'))
    }
  }

  @action
  changeRating (val) {
    this.set('rating', val)
  }

  @action
  resetRating () {
    this.set('rating', this.get('ratingMarkedByUser'))
  }

  @action
  markRating (rating) {
    this.set('hasUserMarkedRating', true)
    this.set('isEditing', false)
    this.set('ratingMarkedByUser', rating)
  }

  @action
  toggleEditingMode () {
    // this.set('rating', 0)
    this.toggleProperty('isEditing')
    if (this.get('showModal') == true) {
      this.set('isShowingModal', true)
    }
  }

  @action
  submitFeedback() {
    this.get('api').request('/courses/' + this.get('course.id') + '/rating', {
      method: 'POST',
      data: {
        value: this.get('ratingMarkedByUser'),
        experience: this.get('textExperience'),
        review: this.get('textPublic')
      }
    })
    this.afterFeedback()
  }

  @action
  afterFeedback() {
    this.set('isShowingModal', false)
    this.set('isEditing', false)
  }

  @action
  toggleModal (rating) {
    this.markRating(rating)
    if (this.get('showModal') == true) {
      this.toggleProperty('isShowingModal')
    } else {
      this.set('textExperience', '')
      this.set('textPublic', '')
      this.submitFeedback()
    }
  }
}
