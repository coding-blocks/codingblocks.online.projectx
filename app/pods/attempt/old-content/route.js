import Route from '@ember/routing/route';

export default class AttemptOldContentRoute extends Route {
  beforeModel(transition) {
    debugger
    if (transition.to.queryParams.s) {
      const { contentId } = this.paramsFor('attempt.old-content')
      const { runAttemptId } = this.paramsFor('attempt')
      this.transitionTo('attempt.content', runAttemptId, transition.to.queryParams.s, contentId)
    } else {
      this.transitionTo('404')
    }
  }
}
