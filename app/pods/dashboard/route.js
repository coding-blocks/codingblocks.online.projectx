import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'codingblocks-online/mixins/authenticated-route-mixin';

export default class Dashboard extends Route.extend(AuthenticatedRouteMixin) {

  async model() {
    return await this.store.queryRecord('run', {
      custom: {
        ext: 'url',
        url: 'lastAccessedRun',
        
      },
      include: 'course,run_attempts'
    })
  }
  setupController(controller, model) {
    controller.set('lastAccessedRun', model)
  }
}
