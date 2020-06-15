import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default class IndexRoute extends Route {
  @service api
  @service currentUser
  @service session

  model() {
    const stats = this.api.request('spins/stats')
    const usedSpins = this.session.isAuthenticated && this.store.query('spin', {
      filter: {
        userId: this.currentUser.id,
        used: true,
        won: true
      },
      include: 'spin_prize',
      exclude: 'spin_prize.*,user',
      sort: '-used_at'
    })
    const referralCode = this.api.request('users/myReferral').catch(err => {
      console.error(err)
      return { code: null }
    })

    return RSVP.hash({
      stats,
      usedSpins,
      referralCode
    })
  }

  setupController(controller, model) {
    controller.set('stats', model.stats)
    controller.set('usedSpins', model.usedSpins)
    controller.set('referralCode', model.referralCode.code)
    controller.set('reloadRoute', () => this.refresh())
  }
}
