import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default class Dashboard extends Route {
  @service api

  async model() {
    const run = await this.store.queryRecord('run', {
      custom: {
        ext: 'url',
        url: 'lastAccessedRun'
      }
    })
    const progress = this.get('api').request(`run_attempts/${run.get('topRunAttempt.id')}/progress`)
    return RSVP.hash({
      run,
      progress
    })
  }
  setupController(controller, model) {
    controller.set('lastAccessedRun', model.run)
    controller.set('progress', model.progress)
  }
}
