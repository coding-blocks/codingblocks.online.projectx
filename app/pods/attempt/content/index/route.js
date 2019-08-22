import Route from '@ember/routing/route';
import { hash, allSettled } from 'rsvp';
import { inject } from '@ember/service'

export default Route.extend({
    api: inject(),
    currentUser: inject(),
    store: inject(),
    headData: inject(),
    queryParams: {
        start: {
            replace: true
        }
    },
    model (params) {
        return hash({
            runAttempt: this.modelFor('attempt'),
            content: this.modelFor('attempt.content'),
            sectionId: this.paramsFor('attempt.content').sectionId,
            payload: this.modelFor('attempt.content').get('payload'),
            run: this.modelFor('attempt').get('run')
        })
    },
    setupController(controller, model) {
        this._super(...arguments)
        controller.set("sectionId", this.paramsFor('attempt.content').sectionId)
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
      const sectionId = model.sectionId
      if (sectionId) {
        const section = this.store.peekRecord('section', sectionId)
        this.set('headData.title', section.get('name') + " | " + model.content.get('title') + " player ");
      } else {
        this.set('headData.title', model.content.get('title') + " player ")
      }

      if (!model.content.get('payload.id')) {
          return ;
      }

      if (model.content.get('contentable') === 'qna') {
        this.transitionTo('attempt.content.quiz', model.content.get('payload.qId'))
      }

      if (model.content.get('contentable') === 'code-challenge') {
          this.set('api.headers.hackJwt', this.get('currentUser.user.hackJwt'))
          try{
              const editorialPromise = this.api.request('/code_challenges/editorials', {
                  type: 'GET',
                  data: {
                    contest_id: model.run.get("contestId"),
                    p_id: model.payload.get("hbProblemId")
                  }
              })
              const testcasePromise = this.api.request('/code_challenges/testcases', {
                  type: 'GET',
                  data: {
                    contest_id: model.run.get("contestId"),
                    p_id: model.payload.get("hbProblemId")
                  }
              })
              const [editorialPayload, testcasesPayload] = await allSettled([editorialPromise, testcasePromise])

              if(editorialPayload.state === 'fulfilled'){
                  const editorialRecord = this.store.createRecord('editorial', editorialPayload.value.data.attributes);
                  model.payload.set('editorial', editorialRecord)
              }
              if (testcasesPayload.state === 'fulfilled') {
                  const testcases = testcasesPayload.value.data.map(t=>{
                      return this.store.createRecord('testcase', {input: t.attributes.input, expectedOutput: t.attributes['expected-output']});
                  })
                  model.payload.set('testcases', testcases);
              }
          }
          catch(err){
              console.log(err)
          }
          
      }
    },
});
