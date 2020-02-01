import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'codingblocks-online/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default class Dashboard extends Route.extend(AuthenticatedRouteMixin) {
  @service api

  async model() {
    const run = await this.store.queryRecord('run', {
      custom: {
        ext: 'url',
        url: 'lastAccessedRun',
        
      },
      include: 'course,run_attempts'
    }).catch(console.log)
    const rating = await this.api.request('courses/' + run.topRunAttempt.get('run.course.id') + '/rating')
    run.topRunAttempt.set("rating", rating.userScore)
    
    return run
  }
  setupController(controller, model) {
    controller.set('lastAccessedRun', model)
  }
}
