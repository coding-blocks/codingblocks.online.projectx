import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend({
  api: Ember.inject.service('api'),
  headData: Ember.inject.service(),
  model (params) {
    const courseId = this.modelFor('classroom.timeline').get("run.course.id")
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
        run: this.modelFor('classroom.timeline').get("run"),
        doubts: this.get('api').request(`/courses/${courseId}/doubts`, {
            data: {
                order: "latest"
            }
        })
    });
  },
  setupController (controller, model) {
      controller.set("run", model.run)
      controller.set("course", model.run.get('course'))
      controller.set("announcements", model.announcement)
      controller.set("doubts", model.doubts.topic_list? model.doubts.topic_list.topics : []);
  },
  afterModel(model) {
    this.set('headData.title', model.run.get('course.title'))
    $('.label_39').show()
  }
});
