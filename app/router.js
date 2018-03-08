import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('courses');
  /*
    This is how it's gonna be

    this.route('classroom', function () {
      this.route('course-timeline', {path: '/course/:courseId/run/:runId'}, function () { 
        // Move runAttempt Logic to service
        this.route('content', {path: '/content/content:id'}) // Move this content (document/lecture/video) logic to service
      })
    })
  */
  this.route('classroom', function() {});
});

export default Router;
