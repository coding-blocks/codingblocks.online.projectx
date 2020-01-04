import Controller from '@ember/controller';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class Track extends Controller {
  @service store

  @restartableTask fetchInstructorsTask = function *() {
    return yield this.store.query('instructor', {
      custom: {
        ext: 'url',
        url: `career_tracks/${this.track.id}/instructors`,
        noResourceName: true
      }
    })
  }
}
