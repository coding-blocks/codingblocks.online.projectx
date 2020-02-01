import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  queryParams: {
    q: {
      refreshModel: true
    }
  },
  model (params) {
    const quiz = this.modelFor('attempt.content.quiz.view').quiz
    return hash({
      question: this.store.findRecord('question', quiz.get('questions').objectAt(params.q - 1).id),
      quizAttempt: this.store.findRecord('quiz_attempt', params.viewQuizAttemptId),
      quiz
    })
  },
  setupController (controller, model) {
    controller.set("question", model.question)
    controller.set("quizAttempt", model.quizAttempt)
    controller.set("quiz", model.quiz)
  }
});
