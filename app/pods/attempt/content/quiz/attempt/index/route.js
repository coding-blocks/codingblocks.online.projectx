import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  queryParams: {
    q: {
      replace: true
    }
  },
  model () {
    return hash({
      quizAttempt: this.modelFor('attempt.content.quiz.attempt'),
      quiz: this.modelFor('attempt.content.quiz').quiz
    })
  },
  setupController (controller, model) {
    controller.set("quizAttempt", model.quizAttempt)
    controller.set("quiz", model.quiz)
    controller.set("questions", model.quiz.get('questions'))
    this._super(...arguments)
  },
  resetController (controller, isExiting, transition) {
    this._super.apply(this, arguments);

    if(isExiting) {
      controller.set('currentQuestion.markedChoices', [])
    }
  }
});
