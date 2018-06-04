import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import googlePageview from './mixins/google-pageview';

const Router = EmberRouter.extend(googlePageview, {
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('courses', function() {
    this.route('id', {path: '/:course_id'});
  });
  this.route('classroom', function() {
    this.route('timeline', {path: '/course/:course_id/run/:run_id'}, function () {
      this.route('overview');
      this.route('contents');
      this.route('announcements');
      this.route('doubts');
    })
  });
  this.route('attempt', {path: '/player/:run_attempt_id'}, function() {
    this.route('content', {path: '/content/:content_id'}, function() {});
  });
  this.route('error');
  this.route('loading');
  this.route('application-loading');
  this.route('notifications', function() {});
  this.route('otp');
});

export default Router;
