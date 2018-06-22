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

    constructor () {
        super(...arguments)
        this.set('hasUserMarkedRating', false);
    }

    didReceiveAttrs () {
        this._super(...arguments)
        this.get('api').request('/courses/'+ this.get('course.id') + '/rating').then(response => {
            this.set('initialRating', response.rating)
            this.set('rating', this.get('initialRating'))
            if (response.userScore) {
                //user has already voted
                this.set('hasUserMarkedRating', true)
                this.set('ratingMarkedByUser', response.userScore.value)
            }
        })
    }

    @alias('rating') numberOfGoldStars

    @computed('rating', 'scale')
    get numberOfGreyStars () {
        return this.scale - this.rating
    }

    @action
    changeRating (val) {
        this.set('rating', val)
    }

    @action
    resetRating () {
        if (this.get('hasUserMarkedRating')) {
            this.set('rating', this.get('ratingMarkedByUser'))
        } else {
            this.set('rating', this.get('initialRating'))
        }
    }

    @action
    markRating (rating) {
        this.set('hasUserMarkedRating', true)
        this.set('ratingMarkedByUser', rating)
        this.get('api').request('/courses/' + this.get('course.id') + '/rating', {
            method: 'POST',
            data: {
                value: this.get('ratingMarkedByUser'),
            }
        })
    }
}
