import Route from '@ember/routing/route';
import { hash } from 'rsvp';


export default Route.extend({
  model (params) {
    return hash({
      runAttempt: this.modelFor('attempt'),
      content: this.modelFor('attempt.content'),
      payload: this.modelFor('attempt.content').get('payload'),
      quiz: this.store.findRecord('quiz', params.quizId, {
        include: 'questions'
      })
    })
  },
  setupController(controller, model) {
    controller.set("sectionId", this.paramsFor('attempt').sectionId)
    controller.set("runAttempt", model.runAttempt)
    controller.set("content", model.content)
    controller.set("payload", model.payload)
  },
  renderTemplate(controller, model) {
    this.render()
    this.render("attempt.content.index.heading", {
        outlet: "heading",
        controller: this.controllerFor("attempt.content.quiz"),
        into: "attempt"
    })
  },
});
