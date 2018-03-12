import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('courses');
  this.route('classroom', function() {
    this.route('timeline', {path: '/course/:courseId/run/:runId'}, function () {})
  });
  this.route('attempt', {path: '/player/:runAttemptId'}, function() {
    this.route('content', {path: '/content/:contentId'}, function() {});
  });
});

export default Router;
