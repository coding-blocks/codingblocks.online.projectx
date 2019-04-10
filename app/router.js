import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import googlePageview from './mixins/google-pageview';

const Router = EmberRouter.extend(googlePageview, {
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('courses', function() {
    this.route('id', {path: '/:courseId'});
  });
  this.route('classroom', function() {
    this.route('timeline', {path: '/course/:courseId/run/:runId'}, function () {
      this.route('overview');
      this.route('contents');
      this.route('announcements');
      this.route('doubts');
    })
  });
  this.route('attempt', {path: '/player/:runAttemptId'}, function() {
    this.route('content', {path: '/content/:contentId'}, function() {
      this.route('quiz', {path: '/quiz/:quizId'} ,function() {
        this.route('attempt', {path: '/s/:quizAttemptId'}, function() {
          this.route('done');
        });
        this.route('view', {path: '/v/:viewQuizAttemptId'}, function() {});
      });
    });
  });
  this.route('error');
  this.route('loading');
  this.route('application-loading');
  this.route('payment_webhook');
  this.route('notifications', function() {});
  this.route('otp');
  this.route('logout');
  this.route('payment-webhook-loading');
  this.route('certificate', {path: '/certificates/:licenseKey'});
  this.route('nagarro', function() {});
  this.mount('hiring-blocks', {path: '/jobs'});
  this.route('login');
  this.route('feedback', function() {
    this.route('doubt', {path: '/d/:doubt_id'});
  });
  this.route('404', { path: '/*:' });
});

export default Router;
