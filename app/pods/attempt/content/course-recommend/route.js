import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import {inject as service} from '@ember/service'


export default class AttemptContentCourseRecommendRoute extends Route {
  @service store
    model(){
      return hash({
        content: this.modelFor('attempt.content'),
        course:  this.store.findRecord('course',this.store.peekRecord('content', this.paramsFor('attempt.content').contentId).get('payload').get('courseId'))
    })
  }
    setupController(controller, {content,course}) {
      controller.set('content', content)
      controller.set('course_recommend', content.payload)
      controller.set('course',course)
    }
}
