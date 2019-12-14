import Route from '@ember/routing/route';

export default class Dashboard extends Route {

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
