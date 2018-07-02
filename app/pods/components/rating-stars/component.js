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

    constructor () {
        super(...arguments)
        this.set('hasUserMarkedRating', false);
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
        this.get('api').request('/courses/' + this.get('course.id') + '/rating', {
            method: 'POST',
            data: {
                value: this.get('ratingMarkedByUser'),
            }
        })
    }

    @action
    toggleEditingMode () {
        this.set('rating', 0)
        this.toggleProperty('isEditing')
    }
}
