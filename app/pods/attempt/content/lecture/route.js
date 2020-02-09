import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class LectureRoute extends Route {
  queryParams = {
    start: {
      replace: true
    }
  }

  model() {
    return hash({
      content: this.modelFor('attempt.content'),
      runAttempt: this.modelFor('attempt')
    })
  }

  setupController(controller, {content, runAttempt}) {
    controller.set('content', content)
    controller.set('lecture', content.payload)
    controller.set('runAttempt', runAttempt)
  }
}
