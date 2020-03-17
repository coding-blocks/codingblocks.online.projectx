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

    const hbContent = this.api.request(`code_challenges/${content.payload.get('id')}/content`, {
      data: {
        contest_id: runAttempt.get("run.contestId")
      }
    }).then(payload => {
      if (!payload) return {}
      this.store.unloadAll('hbcontent')
      this.store.pushPayload(payload)
      return this.store.peekRecord('hbcontent', payload.data.id)
    }).catch(err => {
      console.log(err)
      return {}
    })
    
    return hash({
      content,
      hbContent,
      runAttempt
    })
  }

  setupController(controller, model) {
    controller.set('content', model.content)
    controller.set('codeChallenge', model.content.payload)
    controller.set('hbContent', model.hbContent)
    controller.set('runAttempt', model.runAttempt)
  }
}
