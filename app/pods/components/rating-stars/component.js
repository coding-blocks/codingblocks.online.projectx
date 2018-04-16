import Component from '@ember/component';
import { action, computed } from 'ember-decorators/object';
import { alias } from 'ember-decorators/object/computed'

// prop: intialRating
export default class RatingStartComponent extends Component {
    intialRating = 3

    scale = 5
    rating = 3

    constructor () {
        super(...arguments)
        this.set('rating', this.get('intialRating'))
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
        this.set('rating', this.get('intialRating'));
    }
}