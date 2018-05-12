import Component from "@ember/component";
import { later } from "@ember/runloop";
import { task, timeout } from "ember-concurrency";
import { action } from "ember-decorators/object";
import { alias } from "ember-decorators/object/computed";
import { service } from "ember-decorators/service";

export default class SearchBoxComponent extends Component {
  tagName = 'span'
  hideResultsBox = true
  qs = ''

  @service api
  @service router

  @alias('searchTask.lastSuccessful.value') results

  searchTask = task(function * () {
    yield timeout (1000)
    const searchQuery = this.get('qs')
    return this.get('api').request('courses/search', {
      data: {
        searchQuery
      }
    }).then(response => {
      this.set('hideResultsBox', false)
      return response
    })
  }).restartable()

  @action
  transitonToResult (course) {
    if (course.userEnrollment && course.userEnrollment.courseId) {
      return this.get('router').transitionTo("classroom.timeline", 
      course.userEnrollment.courseId,
      course.userEnrollment.runId
      )
    } else {
      return this.get('router').transitionTo("courses.id", course.userEnrollment.courseId)
    }
  }

  @action
  showResult () {
    this.set('hideResultsBox', false);
  }
  @action
  hideResult () {
    later(this, () => this.set('hideResultsBox', true), 100);
  }
}
