import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
    model () {
        return hash({
            content: this.modelFor('attempt.content'),
            payload: this.modelFor('attempt.content').get('payload')
        })
    },
    setupController(controller, model) {
        controller.set("content", model.content)
        controller.set("payload", model.payload)
    }
});
