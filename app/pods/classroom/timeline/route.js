import { get } from '@ember/object';
import Route from "@ember/routing/route";
import { isNone } from "@ember/utils";
import { inject as service } from '@ember/service'

export default Route.extend({
  api: service(),
  metrics: service(),
  breadCrumb: {
    title: 'Course Dashboard',
  },
  activate () {
    window.scrollTo(0, 0)
  },
  async model(params, transition) {
    let runAttempts = await this.store.query("run-attempt", {
        filter: {
          runId: params.runId
        },
        exclude: 'progresses,quiz_attempts,certificates,csv_submissions,doubts,notes'
    })

    let runAttempt = get(runAttempts, 'firstObject')
    
    // runAttempt is revoked
    if (runAttempt.revoked) {
      return runAttempt
    }
    
    if (!isNone(runAttempt)) {
      runAttempt = await this.store.findRecord("run-attempt", runAttempt.get("id"), {reload: true})
    } else {
      transition.abort();

      // try to enroll in preview
      try {
        await this.api.request(`runs/${params.runId}/enroll`)
        transition.retry()
      } catch (err) {
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
      }
    }
    

    const goodieRequestsForRunAttempt = await this.store.query("goodie-request", {
      filter: {
        runAttemptId: runAttempt.id
      }
    }).then(x => get(x, 'firstObject'))

    runAttempt.set("goodieRequests",
      isNone(goodieRequestsForRunAttempt)
        ? this.store.createRecord("goodie-request", {}) :
        goodieRequestsForRunAttempt
    )

    const rating = await this.api.request('courses/' + runAttempt.get('run.course.id') + '/rating')
    runAttempt.set("rating", rating.userScore)
    
    this.set('breadCrumb.title', runAttempt.get('run.description'))
    return runAttempt
  }
});
