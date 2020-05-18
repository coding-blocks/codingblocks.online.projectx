import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import googlePageview from './mixins/google-pageview';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

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
      this.route('library');
    })
  });
  this.route('attempt', {path: '/player/:runAttemptId'}, function() {
    this.route('old-content', {path: '/content/:contentId'});
    this.route('content', {path: '/content/:sectionId/:contentId'}, function() {
      this.route('quiz', {path: '/quiz/:quizId'} ,function() {
        this.route('attempt', {path: '/s/:quizAttemptId'}, function() {
          this.route('done');
        });
        this.route('view', function() {
          this.route('quiz-attempt', {path: '/v/:viewQuizAttemptId'});
        });
        this.route('loading');
      });
      this.route('code-challenge');
      this.route('lecture');
      this.route('document');
      this.route('video');
      this.route('csv');
      this.route('webinar');
    });
  });
  this.route('error');
  this.route('payment_webhook');
  this.route('notifications', function() {});
  this.route('otp');
  this.route('payment-webhook-loading');
  this.route('certificate', {path: '/certificates/:licenseKey'});
  this.route('nagarro', function() {});
  this.mount('hiring-blocks', {path: '/jobs'});
  this.route('login');
  this.route('feedback', function() {
    this.route('doubt', {path: '/d/:doubt_id'});
    this.route('thanks');
  });
  this.route('inbox');
  this.route('404', { path: '/*:' });
  this.mount('cricket-cup', {path: '/cricket_cup'});
  this.route('dashboard');
  this.route('tracks', function() {
    this.route('id', {path: '/:slug'});
  });
  this.route('spin', {path: '/valentines'}, function() {});
  this.route('login-blocker');
  this.route('subscribe');
});
