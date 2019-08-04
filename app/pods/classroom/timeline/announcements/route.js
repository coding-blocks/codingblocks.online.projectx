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
            include: 'user',
            filter: {
              runId: this.paramsFor('classroom.timeline').runId,
            },
            page: {
              offset: params.offset,
              limit: params.limit
            },
            sort: '-createdAt'
          }),
          run: this.modelFor('classroom.timeline').run
      });
  },
  setupController(controller, model) {
    controller.set("announcements", model.announcement)
    controller.set("meta",model.announcement.get("meta"))
    controller.set("course", model.run.get("course"))
    controller.set("run", model.run)
  },
});
