import Component from "@ember/component";
import { alias } from "@ember/object/computed";
import { inject as service } from '@ember/service';
import { action, computed } from "@ember/object";
import { restartableTask } from 'ember-concurrency-decorators';
import { later } from '@ember/runloop';

export default class CodeChallengeComponent extends Component {
  @service api;
  @service ajax;
  @service hbApi;
  @service currentUser;
  @service store;
  @service runAttempt
  @service taskPoller;
  @alias("payload") code;

  previousSourceCode = null;
  sourceCode = "";
  customInput = "";
  customOutput = "";
  runError = "";
  language = "cpp";
  classNames = ["height-100"];
  err = "";
  isShowingModal = false;
  showCollabModal = false;

  @computed("code.content.id", "runAttempt.id", "runAttempt.doubts")
  get relatedPendingDoubt () {
    // if (!this.runAttempt.runAttemptId) 
    const runAttempt = this.store.peekRecord('run-attempt', this.runAttempt.id)
    return runAttempt.doubts.find(doubt => doubt.get('content.id') == this.code.get('content.id') && ['PENDING', 'ACKNOWLEDGED'].includes(doubt.get('status')))
  }

  @computed("sourceCode")
  get sourceCodeBase64() {
    return window.btoa(this.get("sourceCode"));
  }

  @computed("problemJsonApiPayload")
  get problem() {
    const payload = this.get("problemJsonApiPayload");
    return payload ? payload.data.attributes : {};
  }

  @computed("tab")
  get tabName() {
    return this.get('tab') || "problem"
  }

  @computed("problemJsonApiPayload")
  get codeStubs() {
    const payload = this.get("problemJsonApiPayload");
    if (!payload) return [];
    const checkList = {
      java: true,
      cpp: true,
      c: true,
      py2: true,
      py3: true,
      csharp: true,
      js: true
    };
    return payload.included
      .filter(stubs => {
        if (checkList[stubs.attributes.language] && stubs.attributes.body) {
          checkList[stubs.attributes.language] = false;
          return true;
        } else {
          return false;
        }
      })
      .map(stub => stub.attributes);
  }

  @computed("customInput")
  get customInputBase64() {
    return window.btoa(this.get("customInput"));
  }

  didReceiveAttrs() {
    this._super(...arguments);
    const code = this.get("code");
    const run = this.get("run");

    this.set('showCollabModal', !!this.relatedPendingDoubt && this.relatedPendingDoubt.firebaseRef)

    this.set('api.headers.hackJwt', this.get('currentUser.user.hackJwt'))
    if (this.get('problemJsonApiPayload') && +this.get('problemJsonApiPayload.data.id') === code.get("hbProblemId")) {
      return
    }
    this.get("api")
      .request("code_challenges/problems", {
        data: {
          contest_id: run.get("contestId"),
          problem_id: code.get("hbProblemId")
        },
      })
      .then(result => {
        this.set("problemJsonApiPayload", result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  @action
  toggleModal(modalContentType) {
    this.set("modalContentType", modalContentType)
    this.toggleProperty('isShowingModal')
    this.set('err', '')
  }
  
  @restartableTask runCodeTask = function *(config) {
    this.set('api.headers.hackJwt', this.get('currentUser.user.hackJwt'))
    const code = this.get("code");
    const payload = yield this.get("api").request("code_challenges/submit", {
      method: "POST",
      data: {
        problemId: code.get("hbProblemId"),
        custom_input: config.input,
        source: config.source,
        language: config.lang,
      },
    });

    const submissionId = payload.submissionId
    const status = yield this.taskPoller.performPoll(() => this.get("api").request("code_challenges/status/" + submissionId, {
        "method": "GET"
    }), submissionStatus => submissionStatus && submissionStatus['judge-result'] !== null);
    return status['judge-result'];
  }

  @restartableTask submitCodeTask = function *(config) {
    this.set('api.headers.hackJwt', this.get('currentUser.user.hackJwt'))
    const code = this.get("code");
    const run = this.get("run");
    const payload = yield this.get("api").request("code_challenges/submit", {
      method: "POST",
      data: {
        contestId: run.get("contestId"),
        problemId: code.get("hbProblemId"),
        language: config.lang,
        source: config.source
      }
    });
    this.set("previousSourceCode", window.atob(config.source))

    const submissionId = payload.submissionId
    const status = yield this.taskPoller.performPoll(() => this.get("api").request("code_challenges/status/" + submissionId, {
      "method": "GET"
    }), submissionStatus => submissionStatus && submissionStatus['judge-result'] !== null);

    this.get('api').request('code_challenges/problems',{
      data: {
        contest_id: run.get("contestId"),
        problem_id: code.get("hbProblemId")
      },
    }).then(async result=>{
      this.set("problemJsonApiPayload", result);
      const payload = JSON.parse(JSON.stringify(result))
      this.get('store').unloadAll('problem')
      later(async() => {
        this.get('store').pushPayload(payload)
        const problem = await this.get('store').peekRecord('problem', code.get('hbProblemId'))
        if (await problem.get('hasLatestSubmissionPassed') && await problem.get('mostSuccessfullSubmission.score') == 100) {
          const progress = await this.get('code.content').get('progress')
          progress.set("status", 'DONE')
          progress.save();
        }
      }, 0)
    })
  
    
    //invalidate leaderboard cache
    const runId = this.get('run.id')
    yield this.get('api').raw(`/runs/${runId}/leaderboard/invalidate`, {
      method: 'POST',
    })

    return status['judge-result']
  }

  @action
  fetchEditorial(){
    this.get("fetchEditorialTestcases").perform('editorials').then(response=>{
      const editorial = this.get('store').createRecord('editorial', response.data.attributes)
      this.set('code.editorial', editorial)
    });
  }

  @action
  fetchTestcases(){
    this.get("fetchEditorialTestcases").perform('testcases').then(response=>{
      const testcases = response.data.attributes.urls.map(t => {
        return this.get('store').createRecord('testcase', { input: t.input, expectedOutput: t['expected-output'] })
      })
      this.set('code.testcases', testcases)
    })
    
  }

  @restartableTask fetchEditorialTestcases = function *(which) {
    try{
      this.set('api.headers.hackJwt', this.get('currentUser.user.hackJwt'))
      const run = this.get("run")
      const code = this.get('code')
      return yield this.get("api").request(`code_challenges/`+ which +`?contest_id=${run.get("contestId")}&p_id=${code.get("hbProblemId")}&force=true`)
    }
    catch(err){
      switch(which){
        case 'editorials': this.set("err", 'An editorial does not exist for this problem')
                           break;
        case 'testcases': this.set("err", 'Testcase unlock is blocked for this problem')
                          break;                       
      }
    }
  }

}
