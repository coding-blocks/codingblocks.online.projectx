import Controller from '@ember/controller';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class Tracks extends Controller {
  @service store

  @restartableTask onSearchTask = function *(opts) {
    const careerTrack = yield this.store.queryRecord('career-track', {
      custom: {
        ext: 'url',
        url: 'recommend'
      },
      opts
    })
    this.transitionToRoute('tracks.id', careerTrack.slug)
  }
}
