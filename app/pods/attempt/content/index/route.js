import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
    title: function(model){
        let sectionName = model.runAttempt.get('sections').find(section => {
            return section.id == this.paramsFor('attempt').sectionId;
          }).name;
        let contentName = model.payload.get('name');
        return sectionName + ' - '+ contentName;
    },
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
    }
});
