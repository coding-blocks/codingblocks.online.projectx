import Component from "@ember/component";
import { later } from "@ember/runloop";
import { timeout } from "ember-concurrency";
import { action } from "@ember/object";
import { alias } from "@ember/object/computed";
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';


export default class SearchBoxComponent extends Component {
  tagName = 'span'
  hideResultsBox = true
  qs = ''

  @service api
  @service router
  @service currentUser

  @alias('searchTask.lastSuccessful.value') results
  @alias('currentUser.organization') organization

  @restartableTask
  *searchTask () {
    yield timeout (1000)
    const searchQuery = this.get('qs')
    const extraWhere = {}
    if (this.organization) {
      extraWhere.organization = this.organization
    }
    return this.get('api').request('courses/search', {
      data: {
        searchQuery,
        ...extraWhere
      }
    }).then(response => {
      this.set('hideResultsBox', false)
      return response
    })
  }

  @action
  transitonToResult (course) {
    if (course.userEnrollment && course.userEnrollment.courseId) {
      return this.get('router').transitionTo("classroom.timeline", 
      course.userEnrollment.courseId,
      course.userEnrollment.runId
      )
    } else {
      return this.get('router').transitionTo("courses.id", course.id)
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
