import Component from '@ember/component';
import { computed } from '@ember/object'
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';

export default class CourseBasicInfo extends Component {
  @service api

  @alias("run.course") course

  @computed ('course.instructors.@each.name')
  get instrcutorNames () {
    return this.get('course.instructors').mapBy('name').join(', ')
  }

  @restartableTask fetchPercentProgressForRunTask = function* ()  {
    const response = yield this.get('api').request(`run_attempts/${this.run.topRunAttempt.id}/progress`)
    this.set('progressPercent', response.percent)
  }

  didReceiveAttrs() {
    this.fetchPercentProgressForRunTask.perform()
    this._super(...arguments)
  }
}
