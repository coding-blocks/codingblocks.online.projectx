import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model (params) {
    return hash({
        announcement: this.store.query("announcement", {
          filter: {
            runId: this.paramsFor('classroom.timeline').runId,
          },
          page: {
            offset: 0,
            limit: 5
          },
          order: '-updatedAt'
        }),
        run: this.modelFor('classroom.timeline').get("run")
    });
  },
  setupController (controller, model) {
      controller.set("run", model.run)
      controller.set("course", model.run.get('course'))
      controller.set("announcements", model.announcement)
  }
});
