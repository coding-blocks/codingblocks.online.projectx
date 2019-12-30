import Route from "@ember/routing/route"
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service api

  async beforeModel() {
    const { runAttemptId } = this.paramsFor('attempt')
    try {
      const nextContent = await this.api.request(`/run_attempts/${runAttemptId}/nextContent`)
  
      this.transitionTo(
        "attempt.content",
        runAttemptId,
        nextContent.sectionId,
        nextContent.contentId
      );
    } catch (err) {
      const run = this.modelFor('attempt').get('run')
      const section = run.get("sections.firstObject")
      await section.get('contents')
      const content = section.get("contents.firstObject")
      
      this.transitionTo(
        "attempt.content",
        runAttemptId,
        section.id,
        content.id
      );
    }
  }
}
