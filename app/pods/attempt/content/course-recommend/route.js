import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import {inject as service} from '@ember/service'


export default class AttemptContentCourseRecommendRoute extends Route {
  @service store
    model(){
      return hash({
        content: this.modelFor('attempt.content'),
        course: this.store.findRecord('course',25)
    })
  }
    setupController(controller, {content,course}) {
      controller.set('content', content)
      controller.set('course_recommend', content.payload)
      controller.set('course',course)
    }
}
