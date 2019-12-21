import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default class IndexRoute extends Route {
  @service api
  @service currentUser

  model() {
    const stats = this.api.request('spins/stats')
    const usedSpins = this.store.query('spin', {
      filter: {
        userId: this.currentUser.id,
        used: true
      },
      include: 'spin_prize'
    })
    const referralCode = this.api.request('users/myReferral')

    return RSVP.hash({
      stats,
      usedSpins,
      referralCode
    })
  }

  setupController(controller, model) {
    controller.set('stats', model.stats)
    controller.set('usedSpins', model.usedSpins)
    controller.set('referralCode', model.referralCode)
  }
}
