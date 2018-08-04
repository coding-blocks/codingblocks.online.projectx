import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model (params) {
    return hash({
      quizAttempt: this.store.findRecord('quiz_attempt', params.quizAttemptId),
      quiz: this.modelFor('attempt.content.quiz').quiz
    })
  }
});
