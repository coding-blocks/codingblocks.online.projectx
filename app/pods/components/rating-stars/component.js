import Component from '@ember/component'
import { action, computed } from 'ember-decorators/object'
import { alias } from 'ember-decorators/object/computed'
import { service } from 'ember-decorators/service'

export default class FeedbackRatingComponent extends Component {

@service api
  
  scale = 5
  ratingMarkedByUser = null
  isEditing = false
  isShowingModal = false
  
  constructor () {
    super(...arguments)
    if (this.get('initialRating')) {
      this.set('hasUserMarkedRating', true)
      this.set('ratingMarkedByUser', this.get('initialRating.value'))
    } else {
      this.set('hasUserMarkedRating', false)
    }
  }
  
  didReceiveAttrs () {
    this._super(...arguments)
  }
  
  @action
  changeRating (val) {
    this.set('rating', val)
  }
  
  @action
  resetRating () {
    this.set('rating', this.get('initialRating'))
  }
  
  @action
  markRating (rating) {
    this.set('hasUserMarkedRating', true)
    this.set('isEditing', false)
    this.set('ratingMarkedByUser', rating)
  }
  
  @action
  toggleEditingMode () {
    this.set('rating', 0)
    this.toggleProperty('isEditing')
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
    this.set('isShowingModal', false)
  }
  
  @action
  toggleModal (rating) {
    this.toggleProperty('isShowingModal')
  }
}