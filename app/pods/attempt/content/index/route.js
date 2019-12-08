import Route from "@ember/routing/route";
import { hash, allSettled } from "rsvp";
import { inject } from "@ember/service";

export default Route.extend({
  api: inject(),
  queryParams: {
    start: {
      replace: true
    }
  },
  model(params) {
    // TODO: redirect to content specific route
  },
  async afterModel(model) {
    // if (model.content.get("contentable") === "code-challenge") {
    //   this.set("api.headers.hackJwt", this.get("currentUser.user.hackJwt"));
    //   try {
    //     const editorialPromise = this.api.request(
    //       "/code_challenges/editorials",
    //       {
    //         type: "GET",
    //         data: {
    //           contest_id: model.run.get("contestId"),
    //           p_id: model.payload.get("hbProblemId")
    //         }
    //       }
    //     );
    //     const testcasePromise = this.api.request("/code_challenges/testcases", {
    //       type: "GET",
    //       data: {
    //         contest_id: model.run.get("contestId"),
    //         p_id: model.payload.get("hbProblemId")
    //       }
    //     });
    //     const [editorialPayload, testcasesPayload] = await allSettled([
    //       editorialPromise,
    //       testcasePromise
    //     ]);

    //     if (editorialPayload.state === "fulfilled") {
    //       const editorialRecord = this.store.createRecord(
    //         "editorial",
    //         editorialPayload.value.data.attributes
    //       );
    //       model.payload.set("editorial", editorialRecord);
    //     }
    //     if (testcasesPayload.state === "fulfilled") {
    //       const testcases = testcasesPayload.value.data.map(t => {
    //         return this.store.createRecord("testcase", {
    //           input: t.attributes.input,
    //           expectedOutput: t.attributes["expected-output"]
    //         });
    //       });
    //       model.payload.set("testcases", testcases);
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
  }
});
