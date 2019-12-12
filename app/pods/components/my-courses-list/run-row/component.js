import Component from '@ember/component';
import { computed } from '@ember/object'
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default class CourseBasicInfo extends Component {
  @service api

  @alias("run.course") course

  @computed ('course.instructors.@each.name')
  get instrcutorNames () {
    return this.get('course.instructors').mapBy('name').join(', ')
  }
}
