import Component from "@ember/component";
import { alias } from "ember-decorators/object/computed";
import { service } from "ember-decorators/service";
import { action, computed } from "ember-decorators/object";
import { task, timeout } from "ember-concurrency";

export default class CodeChallengeComponent extends Component {
  @service api;
  @service ajax;
  @service hbApi;
  @service currentUser;
  @service store;
  @alias("payload") code;

  sourceCode = "";
  customInput = "";
  customOutput = "";
  runError = "";
  language = "cpp";
  classNames = ["height-100"];
  err = "";
  isShowingModal = false;

  @computed("sourceCode")
  sourceCodeBase64() {
    return window.btoa(this.get("sourceCode"));
  }

  @computed("problemJsonApiPayload")
  problem() {
    const payload = this.get("problemJsonApiPayload");
    return payload ? payload.data.attributes : {};
  }

  @computed("tab")
  tabName() {
    return this.get('tab') || "problem"
  }

  @computed("problemJsonApiPayload")
  codeStubs() {
    const payload = this.get("problemJsonApiPayload");
    if (!payload) return [];
    const checkList = {
      java: true,
      cpp: true,
      c: true,
      py2: true,
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
  customInputBase64() {
    return window.btoa(this.get("customInput"));
  }

  didReceiveAttrs() {
    this._super(...arguments);
    const code = this.get("code");
    const run = this.get("run");
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
  toggleModal() {
    this.toggleProperty('isShowingModal');
    this.set('err', '');
  }
  
  runCodeTask = task(function*(config) {
    this.set('api.headers.hackJwt', this.get('currentUser.user.hackJwt'))
    return yield this.get("api").request("code_challenges/submit", {
      method: "POST",
      data: {
        custom_input: config.input,
        source: config.source,
        language: config.lang,
      },
    });
  });

  submitCodeTask = task(function * (config) {
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

    if(!payload.error){
      this.get('api').request('code_challenges/problems',{
        data: {
          contest_id: run.get("contestId"),
          problem_id: code.get("hbProblemId")
        },
      }).then(async result=>{
        result.content = this.get('code.content.id');
        this.set("problemJsonApiPayload", result);

        const payload = JSON.parse(JSON.stringify(result))
        this.get('store').unloadAll('problem')
        this.get('store').pushPayload(payload)
        const problem = this.get('store').peekAll('problem').objectAt(0)
        
        if(await problem.get('mostSuccessfullSubmission.score')==100){
          const progress = await this.get('code.content').get('progress')
          progress.set("status", 'DONE')
          progress.save();
        }
      })
    }
    
    //invalidate leaderboard cache
    const runId = this.get('run.id')
    yield this.get('api').raw(`/runs/${runId}/leaderboard/invalidate`, {
      method: 'POST',
    })

    return payload
  });

  @action
  fetchEditorial(){
    this.get("fetchEditorialTask").perform();
  }

  fetchEditorialTask = task(function *(){
    try{
      this.set('api.headers.hackJwt', this.get('currentUser.user.hackJwt'))
      const run = this.get("run")
      const code = this.get('code')
      const response = yield this.get("api").request(`code_challenges/editorials?contest_id=${run.get("contestId")}&p_id=${code.get("hbProblemId")}&force=true`)
      const editorial = this.get('store').createRecord('editorial', response.data.attributes)
      this.set('code.editorial', editorial)
    }
    catch(err){
      this.set("err", 'An editorial does not exist for this problem');
    }
  })

}
