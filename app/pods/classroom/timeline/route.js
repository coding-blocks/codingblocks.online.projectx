import Route from "@ember/routing/route";
import { isNone } from "@ember/utils";
import { inject as service } from '@ember/service'

export default Route.extend({
  api: service(),
  activate () {
    window.scrollTo(0, 0)
  },
  model(params, transition) {
    return this.store
      .queryRecord("run-attempt", {
        runId: params.runId
      })
      .then(runAttempt => {
        if (isNone(runAttempt)) {
          transition.abort();

          // try to enroll in preview
          return this.get("api")
            .request(`runs/${params.runId}/enroll`)
            .then(response => {
              transition.retry()
            })
            .catch(err => {
              throw new Error("Cannot enroll you in preview")
            });
        } else {
          return this.store.findRecord("run-attempt",
            runAttempt.get("id"), {
              reload: true
            }
          );
        }
      }).then(async (runAttempt) => {
        await this.get('api').request('courses/' + runAttempt.get('run.course.id') + '/rating', {
          method: 'GET'
        }).then((rating) => {
          runAttempt.set("rating", rating.userScore)
        })
        return runAttempt
      })
  },
  setupController(controller, model) {
    controller.set("run", model.get("run"));
    controller.set("runAttempt", model);
    controller.set("userRating", model.get("rating"));
  },
  actions: {
    reloadRoute() {
      this.refresh();
    }
  }
});
