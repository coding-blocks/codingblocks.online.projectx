import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { allSettled } from 'rsvp';

export default class CodeChallengeRoute extends Route {
  @service api

  async model() {
    const content = this.modelFor('attempt.content')
    const runAttempt = this.modelFor('attempt')

    this.set("api.headers.hackJwt", this.get("currentUser.user.hackJwt"));
    try {
      const editorialPromise = this.api.request(
        "/code_challenges/editorials",
        {
          type: "GET",
          data: {
            contest_id: runAttempt.run.get("contestId"),
            p_id: content.payload.get("hbProblemId")
          }
        }
      );
      const testcasePromise = this.api.request("/code_challenges/testcases", {
        type: "GET",
        data: {
          contest_id: runAttempt.run.get("contestId"),
          p_id: content.payload.get("hbProblemId")
        }
      });
      const [editorialPayload, testcasesPayload] = await allSettled([
        editorialPromise,
        testcasePromise
      ]);

      if (editorialPayload.state === "fulfilled") {
        const editorialRecord = this.store.createRecord(
          "editorial",
          editorialPayload.value.data.attributes
        );
        content.payload.set("editorial", editorialRecord);
      }
      if (testcasesPayload.state === "fulfilled") {
        const testcases = testcasesPayload.value.data.map(t => {
          return this.store.createRecord("testcase", {
            input: t.attributes.input,
            expectedOutput: t.attributes["expected-output"]
          });
        });
        content.payload.set("testcases", testcases);
      }

      return content
    } catch (err) {
      console.log(err);
    }
  }

  setupController(controller, model) {
    controller.set('content', model)
    controller.set('codeChallenge', model.payload)
  }
}
