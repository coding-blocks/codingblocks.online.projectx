import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class CourseRow extends Component {
  @service store

  @restartableTask createOrDestroyCourseWishlist = function *() {
    let userCourseWishlist = yield this.course.get('userCourseWishlist')
    if (userCourseWishlist) {
      return userCourseWishlist.destroyRecord()
    }

    userCourseWishlist = this.store.createRecord('user-course-wishlist', {
      course: this.course
    })
    return userCourseWishlist.save()
  }
}
