import Route from "@ember/routing/route"
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service api

  async beforeModel() {
    const { runAttemptId } = this.paramsFor('attempt')
    const nextContent = await this.api.request(`/run_attempts/${runAttemptId}/nextContent`)

    this.transitionTo(
      "attempt.content",
      runAttemptId,
      nextContent.sectionId,
      nextContent.contentId
    );
  }
}
