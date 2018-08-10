import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  queryParams: {
    q: {
      refreshModel: true
    }
  },
  model (params) {
    return hash({
      question: this.store.findRecord('question', params.q),
      quizAttempt: this.modelFor('attempt.content.quiz.view').quizAttempt,
      quiz: this.modelFor('attempt.content.quiz.view').quiz
    })
  },
  setupController (controller, model) {
    controller.set("question", model.question)
    controller.set("quizAttempt", model.quizAttempt)
    controller.set("quiz", model.quiz)
  }
});
