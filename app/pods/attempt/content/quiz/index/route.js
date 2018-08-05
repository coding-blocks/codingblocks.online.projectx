import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model () {
    return hash({
      quiz: this.modelFor('attempt.content.quiz').quiz,
      qna: this.modelFor('attempt.content.quiz').payload,
      sectionId: this.paramsFor('attempt').sectionId,
      newQuizAttempt: this.store.createRecord('quiz_attempt', {
        submission: {},
        status: 'draft',
        runAttempt: this.store.peekRecord('run_attempt', this.paramsFor('attempt').runAttemptId),
        qna: this.store.peekRecord('content', this.paramsFor('attempt.content').contentId).get('payload')
      })

    })
  },
  setupController (controller, model) {
    controller.set("quiz", model.quiz)
    this._super(...arguments)
  }
});
