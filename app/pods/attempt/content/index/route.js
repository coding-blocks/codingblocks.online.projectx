import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
    headData: Ember.inject.service(),
    model () {
        return hash({
            runAttempt: this.modelFor('attempt'),
            content: this.modelFor('attempt.content'),
            payload: this.modelFor('attempt.content').get('payload')
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
            controller: this.controllerFor("attempt.content.index"),
            into: "attempt"
        })
    },
    afterModel(model) {
      const sectionId = this.paramsFor('attempt').sectionId
      if (sectionId) {
        const section = this.get('store').peekRecord('section', sectionId)
        this.set('headData.title', section.get('name') + " | " + model.payload.get('name') + " player ");
      } else  {
        this.set('headData.title', model.payload.get('name') + " player ")
      }

      if (model.content.get('contentable') === 'qna') {
        this.transitionTo('attempt.content.quiz', model.content.get('payload.qId'))
      }
    }
});

