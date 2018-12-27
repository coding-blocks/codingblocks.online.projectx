import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { inject } from '@ember/service'

export default Route.extend({
    api: inject(),
    currentUser: inject(),
    store: inject(),
    headData: Ember.inject.service(),
    queryParams: {
        start: {
            replace: true
        }
    },
    model () {
        return hash({
            runAttempt: this.modelFor('attempt'),
            content: this.modelFor('attempt.content'),
            payload: this.modelFor('attempt.content').get('payload'),
            run: this.modelFor('attempt').get('run')
        })
    },
    setupController(controller, model) {
        this._super(...arguments)
        controller.set("sectionId", this.paramsFor('attempt').sectionId)
        controller.set("runAttempt", model.runAttempt)
        controller.set("run", model.run)
        controller.set("content", model.content)
        controller.set("payload", model.payload)
        controller.set("sideBarCollapsed", true);
        controller.set("attemptController", this.controllerFor('attempt'))
    },
    renderTemplate(controller, model) {
        this.render()
        this.render("attempt.content.index.heading", {
            outlet: "heading",
            controller: this.controllerFor("attempt.content.index"),
            into: "attempt"
        })
    },
    async afterModel(model) {
      const sectionId = this.paramsFor('attempt').sectionId
      if (sectionId) {
        const section = this.get('store').peekRecord('section', sectionId)
        this.set('headData.title', section.get('name') + " | " + model.payload.get('name') + " player ");
      } else {
        this.set('headData.title', model.payload.get('name') + " player ")
      }

      if (model.content.get('contentable') === 'qna') {
        this.transitionTo('attempt.content.quiz', model.content.get('payload.qId'))
      }

        if (model.content.get('contentable') === 'code-challenge') {
            this.set('api.headers.hackJwt', this.get('currentUser.user.hackJwt'))
            try{
                let response = await this.get('api').request(`/code_challenges/editorials?contest_id=${model.run.get("contestId")}&p_id=${model.payload.get("hbProblemId")}`)
                const editorial  = this.get('store').createRecord('editorial', response.data.attributes);
                model.payload.set('editorial', editorial);
            }
            catch(err){
                console.log(err)
            }
            
        }
    },
});
