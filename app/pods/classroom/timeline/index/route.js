import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';

export default Route.extend({
  api: service('api'),
  headData: service(),
  metrics: service(),
  productTour: service(),
  model (params) {
    return this.modelFor('classroom.timeline')
  },
  setupController (controller, model) {
    controller.set('course', model.get('run.course'))
    controller.set('runAttempt', model)
    controller.set('run', model.get('run'))
    controller.set('userRating', model.get('rating'))
  },
  async afterModel(model) {
    this.set('headData.title', 'My Classroom | ' + model.get('run.course.title'))
    await this.productTour.prepareCourseDashboardTour()
    scheduleOnce('afterRender', () => this.productTour.start())
  },
  actions: {
    log(action, courseIdentifier){
      this.metrics.trackEvent({
        category: 'course',
        label: courseIdentifier,
        action
      })
    }
  }
});
