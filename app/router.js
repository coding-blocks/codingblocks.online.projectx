import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('courses');
  this.route('classroom', function () {
    this.route('index', {
      path: '/course/:courseId/'
    })
    this.route('index', {
      path: '/course/:courseId/batch/:runId'
    })
    this.route('timeline', {
      path: '/course/:courseId/batch/:runId/rollNo/:runAttemptId'
    })
  })
});

export default Router;
