import Route from '@ember/routing/route';

export default Route.extend({
  model () {
    return this.modelFor('attempt.content.quiz.attempt')
  }
});
