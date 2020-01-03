import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model() {
    return hash({
      attempts: this.store.query('quiz_attempt', {
        filter: {
          qnaId: this.modelFor('attempt.content.quiz').payload.id
        },
        sort: '-createdAt'
      }),
      quiz: this.modelFor('attempt.content.quiz').quiz
    })
  },
  setupController(controller, model) {
    controller.set('attempts', model.attempts)
    controller.set('quiz', model.quiz)
  }
});
