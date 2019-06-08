import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default class ListingJobRoute extends Route {
  @service store
  @service session
  @service api

  async model(){
    return RSVP.hash({
      matches: this.store.query('cricket-cup-match', {
        custom: { ext: 'url', url: 'today'},
      }),
      earnings: this.api.request('/cricket_cup/matches/earnings', {
        type: 'GET'
      }).then(payload => payload.earnings)
    })
  }

  setupController(controller, model) {
    controller.set('matches', model.matches)
    controller.set('earnings', model.earnings)
  }
};
