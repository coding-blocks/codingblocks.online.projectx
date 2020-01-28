import Route from '@ember/routing/route';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class Tracks extends Route {
  @service api

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
      await this.onSearchTask.perform({
        status,
        professionId
      })
    }
  }

  @restartableTask onSearchTask = function *(params) {
    const careerTrack = yield this.api.request('career_tracks/recommend', {
      method: 'POST',
      data: {
        ...params
      },
      json: true
    })
    this.transitionTo('tracks.id', careerTrack.data.attributes.slug)
  }

  setupController(controller) {
    controller.set('onSearchTask', this.onSearchTask)
  }
}
