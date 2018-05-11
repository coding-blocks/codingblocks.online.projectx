import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  queryParams: {
    offset: {
      refreshModel: true
    },
    limit: {
      refreshModel: true
    }
  },
    model (params) {
      return hash({
          announcement: this.store.query("announcement", {
            runId: params.runId,
            reload: true,
            page: {
              offset: params.offset,
              limit: params.limit
            }
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
