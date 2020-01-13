import Route from '@ember/routing/route';
import { restartableTask } from 'ember-concurrency-decorators';

export default class Tracks extends Route {
  queryParams = {
    status: {
      refreshModel: false
    },
    professionId: {
      refreshModel: false
    }
  }

  async model(params) {
    const { status, professionId } = params
    if (status && professionId) {
      await this.onSearchTask.perform()
    }
  }

  @restartableTask onSearchTask = function *() {
    const careerTrack = yield this.store.queryRecord('career-track', {
      custom: {
        ext: 'url',
        url: 'recommend'
      },
      opts: {
        status: this.status,
        professionId: this.professionId
      }
    })
    this.transitionTo('tracks.id', careerTrack.slug)
  }

  setupController(controller) {
    controller.set('onSearchTask', this.onSearchTask)
  }
}
