import { get } from '@ember/object';
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
      .query("run-attempt", {
        filter: {
          runId: params.runId
        },
        exclude: 'progresses,quiz_attempts,certificates,csv_submissions,doubts,notes'
      })
      .then(runAttempts => {
        const runAttempt = get(runAttempts, 'firstObject')
        if (isNone(runAttempt)) {
          transition.abort();

          // try to enroll in preview
          return this.api
            .request(`runs/${params.runId}/enroll`)
            .then(response => {
              transition.retry()
            })
            .catch(err => {
              if (err.status == 400 && err.payload.err == "TRIAL_WITHOUT_MOBILE") {
                // trial creation denined because user has no mobile number
                this.transitionTo('error', {
                  queryParams: {
                    errorCode: 'NO_USER_MOBILE_NUMBER'
                  }
                })
              } else {
                throw new Error("Cannot enroll you in preview")
              }
            });
        } else {
          return this.store.findRecord("run-attempt",
            runAttempt.get("id"), {
              reload: true
            }
          );
        }
      })
      .then(async (runAttemptParameter) => {
        return this.store.query("goodie-request", {
          filter: {
            runAttemptId: runAttemptParameter.id
          }
        })
        .then((records) => {
          let record = get(records, 'firstObject')

          if(isNone(record)) {
            console.log("empty")
            record = this.store.createRecord("goodie-request", {})
            record.set("runAttempt", runAttemptParameter)
          }

          runAttemptParameter.set("goodieRequests", record)
          return runAttemptParameter
        })
      })
      .then(async (runAttempt) => {
        await this.api.request('courses/' + runAttempt.get('run.course.id') + '/rating', {
          method: 'GET'
        }).then((rating) => {
          runAttempt.set("rating", rating.userScore)
        })
        return runAttempt
      });
  },
  setupController(controller, model) {
    controller.set("run", model.get("run"));
    controller.set("runAttempt", model);
    controller.set("userRating", model.get("rating"));
    controller.set("goodieRequests", model.get("goodieRequests"))
  },
  actions: {
    reloadRoute() {
      this.refresh();
    }
  }
});
