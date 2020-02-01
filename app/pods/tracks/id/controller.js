import Controller from '@ember/controller';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class Track extends Controller {
  @service store

  @computed('track.courses.@each.title')
  get coursesLoaded() {
    return this.track.hasMany('courses').value()
  }

  @restartableTask fetchJobsTask = function *() {
    return this.store.query('job', {
      page: {
        limit: 3
      }
    })
  }

  @restartableTask fetchInstructorsTask = function *() {
    const instructors = yield this.store.query('instructor', {
      custom: {
        ext: 'url',
        url: `career_tracks/${this.track.id}/instructors`,
        noResourceName: true
      }
    })
    return instructors.uniqBy('id')
  }
}
