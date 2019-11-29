import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class CarouselCards extends Component {
  @service store

  @restartableTask getCarouselCardsTask = function *() {
    return yield this.get('store').query('carousel_card', {
      sort: 'order'
    })
  }
}
