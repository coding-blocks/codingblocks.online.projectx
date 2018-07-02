import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
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
    title: function(model){
        let sectionName = model.runAttempt.get('sections').find(section => {
            return section.get('id') == this.paramsFor('attempt').sectionId;
        }).get('name');
        let contentName = model.payload.get('name');
        return sectionName + ' - '+ contentName;
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
