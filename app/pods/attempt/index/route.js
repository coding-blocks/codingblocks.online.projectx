import Route from "@ember/routing/route"
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service api

  model() {
    return this.modelFor("attempt");
  }

  async afterModel(model) {
    const nextContent = await this.api.request(`/run_attempts/${model.get('id')}/nextContent`)

    this.transitionTo(
      "attempt.content",
      model.get("id"),
      nextContent.sectionId,
      nextContent.contentId
    );
  }
}
