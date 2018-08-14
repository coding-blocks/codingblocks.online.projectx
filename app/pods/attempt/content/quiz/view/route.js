import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model (params) {
    return hash({
      quizAttempt: this.store.findRecord('quiz_attempt', params.viewQuizAttemptId),
      quiz: this.modelFor('attempt.content.quiz').quiz
    })
  },
  setupController (controller, model) {
    controller.set("quizAttempt", model.quizAttempt)
    controller.set("quiz", model.quiz) 
  }
});
