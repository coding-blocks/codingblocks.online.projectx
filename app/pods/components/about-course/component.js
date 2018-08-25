import Component from '@ember/component';
import { inject } from '@ember/service';
import $ from 'jquery';
import { task } from 'ember-concurrency';
import env from "codingblocks-online/config/environment";

export default Component.extend({
  availableRuns: [],

  loginUrl: `${env.oneauthURL}/oauth/authorize?response_type=code&client_id=${env.clientId}&redirect_uri=${env.publicUrl}`,
  session: inject(),
  api: inject(),
  router: inject(),

  _redirectToOneauth () {
    window.location.href = this.loginUrl
  },

  enrollNowTask: task(function *(runId) {
    if(this.get('session.isAuthenticated')) {
      try {
        yield this.get('api').request(`/runs/${runId}/buy`)
        window.location.href = env.dukaanUrl
      } catch (err) {
        this.get('router').transitionTo('error', {
          queryParams: {
            errorCode: 'DUKKAN_ERROR'
          }
        })
      }
    }
    else {
      this.send('logIn')
    }
  }).drop(),

  getRatingStats: task(function * (){
    yield this.get('api').request(`/courses/${this.get('course.id')}/rating`)
    .then(response=>{
      this.set('stats', response.stats);
    })
  }),
  actions: {
    logIn() {
      localStorage.setItem('redirectionPath', this.get('router.currentURL'))
      this._redirectToOneauth()
    },
    logInAndStartTrial (courseId, runId) {
      localStorage.setItem('redirectionPath', this.get('router').urlFor('classroom.timeline.index', {courseId, runId}))
      this._redirectToOneauth()
    }
  },

  init () {
    this._super (...arguments)

    let runs = this.get ('course.runs'),
      availableRuns = runs.filter (run => run.get ('isAvailable'))
    ;

    this.set ('availableRuns', availableRuns)

  },

  didReceiveAttrs(){
    this._super(...arguments);
    this.get('getRatingStats').perform();
  },

  didInsertElement () {
    this._super(...arguments)
    // hide buy-right and pull buy-top when user scrolls to the top of accrodian
    const buyTop = $(".c-buy-top")[0];
    const accordian = $(".c-about-accordian");
    const accordOffsetTop = accordian.offset().top - 350;
    $(window).on('scroll', function() {
      if (window.pageYOffset >= accordOffsetTop) {
        buyTop.classList.remove("slide-up");
      } else {
        buyTop.classList.add("slide-up");
      }
    })
  }



});
