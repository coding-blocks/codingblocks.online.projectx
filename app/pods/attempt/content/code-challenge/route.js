import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class CodeChallengeRoute extends Route {
  @service api
  @service currentUser
  @service player

  async model() {
    const content = this.modelFor('attempt.content')
    const runAttempt = this.modelFor('attempt')
    this.set("api.headers.hackJwt", this.get("currentUser.user.hackJwt"));

    const problem = this.api.request('code_challenges/problems', {
      data: {
        contest_id: runAttempt.get("run.contestId"),
        problem_id: content.payload.get("hbProblemId")
      }
    }).then(payload => {
      if (!payload) return {}
      
      this.store.unloadAll('problem')
      this.store.pushPayload(payload)
      return this.store.peekRecord('problem', content.payload.get('hbProblemId'))
    }).catch(err => {
      console.log(err)
      return {}
    })
    
    return hash({
      content,
      problem,
      runAttempt
    })
  }

  setupController(controller, model) {
    controller.set('content', model.content)
    controller.set('codeChallenge', model.content.payload)
    controller.set('problem', model.problem)
    controller.set('runAttempt', model.runAttempt)
  }
}
