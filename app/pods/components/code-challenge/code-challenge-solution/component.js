import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { action } from '@ember/object';

export default class CodeChallengeSolution extends Component {
  @service store
  @service api
  @service currentUser
  @service player

  @alias('fetchEditorialTask.lastSuccessful.value') editorial
  @alias('fetchTestcasesTask.lastSuccessful.value') testcases

  @restartableTask fetchEditorialTask = function *() {
    const runAttempt = this.store.peekRecord('run-attempt', this.player.runAttemptId)
    this.set("api.headers.hackJwt", this.get("currentUser.user.hackJwt"));

    const editorialPayload = yield this.api.request(
      "/code_challenges/editorials",
      {
        type: "GET",
        data: {
          contest_id: runAttempt.run.get("contestId"),
          p_id: this.problem.get('id')
        }
      }
    );
    return editorialPayload.data.attributes
  }

  @restartableTask fetchTestcasesTask = function *() {
    const runAttempt = this.store.peekRecord('run-attempt', this.player.runAttemptId)
    this.set("api.headers.hackJwt", this.get("currentUser.user.hackJwt"));

    const testcasesPayload = yield this.api.request("/code_challenges/testcases", {
      type: "GET",
      data: {
        contest_id: runAttempt.run.get("contestId"),
        p_id: this.problem.get('id')
      }
    })
    return testcasesPayload.data.map(t => ({
      input: t.attributes.input,
      expectedOutput: t.attributes["expected-output"]
    }));
  }

  @restartableTask unlockEditorialTestcases = function *(which) {
    const runAttempt = this.store.peekRecord('run-attempt', this.player.runAttemptId)
    this.set('api.headers.hackJwt', this.get('currentUser.user.hackJwt'))
    yield this
      .get("api")
      .request(`code_challenges/`+ which +`?contest_id=${runAttempt.run.get("contestId")}&p_id=${this.problem.get("id")}&force=true`)
    
    return (which === 'editorials' ? this.fetchEditorialTask : this.fetchTestcaseTask).perform()
  }

  @action
  viewEditorial() {
    this.set('modalComponent', 'code-challenge/code-challenge-solution/code-challenge-solution-editorial')
    this.set('showModal', true)
  }

  @action
  viewTestcases() {
    this.set('modalComponent', 'code-challenge/code-challenge-solution/code-challenge-solution-testcases')
    this.set('showModal', true)    
  }
}
