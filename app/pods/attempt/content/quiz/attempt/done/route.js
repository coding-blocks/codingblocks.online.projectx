import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model () {
    return hash({
      quizAttempt: this.modelFor('attempt.content.quiz.attempt'),
      quiz: this.modelFor('attempt.content.quiz').quiz
    })
  },
  setupController (controller, model) {
    controller.set("quizAttempt", model.quizAttempt)
    controller.set("quiz", model.quiz)
  }
});
