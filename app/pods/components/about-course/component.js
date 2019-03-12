import Component from '@ember/component';
import { inject } from '@ember/service';
import { get }  from '@ember/object';
import $ from 'jquery';
import { task } from 'ember-concurrency';
import env from "codingblocks-online/config/environment";

export default Component.extend({
  availableRuns: [],
  showCartModal: false,
  runToBuy: null,
  dukaanCart: null,

  loginUrl: `${env.oneauthURL}/oauth/authorize?response_type=code&client_id=${env.clientId}&redirect_uri=${env.publicUrl}`,
  session: inject(),
  api: inject(),
  store: inject(),
  router: inject(),
  currentUser: inject(),

  _redirectToOneauth () {
    window.location.href = this.loginUrl
  },

  enrollNowTask: task(function *(runId) {
    if(this.get('session.isAuthenticated')) {
      try {
        yield this.api.request(`/runs/${runId}/buy`)
        window.location.href = env.dukaanUrl
      } catch (err) {
        let errorCode;

        if (err.status == 400 && err.payload.err == 'TRIAL_WITHOUT_MOBILE') {
          errorCode = 'NO_USER_MOBILE_NUMBER'
          this.get('router').transitionTo('error', {
            queryParams: { errorCode }
          })
        } else {
          const cart = yield this.get('api').request(`/runs/cart`)
          const run = yield this.get('store').queryRecord("run", {
              custom: {
                ext: 'url',
                url: `${runId}?exclude=courses.*`
              }
            })
            
          // if the product in cart is the same as product user wants to buy; just continue
          if (get(cart, 'cartItems.0.product_id') == run.get('productId')) {
            return window.location.href = env.dukaanUrl
          }

          this.set('dukaanCart', cart.cartItems[0])
          this.set('runToBuy', run)
          this.set('showCartModal', true)
        }
      }
    }
    else {
      this.send('logIn')
    }
  }).drop(),

  getRatingStats: task(function * (){
    yield this.api.request(`/courses/${this.get('course.id')}/rating`)
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
      localStorage.setItem('redirectionPath', this.router.urlFor('classroom.timeline.index', {courseId, runId}))
      this._redirectToOneauth()
    },
    goToTimeline (runId) {
      this.router.transitionTo(`/classroom/course/${this.get('course.id')}/run/${runId}`)
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
    this.getRatingStats.perform();
  },

  didInsertElement () {
    this._super(...arguments)
    // hide buy-right and pull buy-top when user scrolls to the top of accrodian
    const buyTop = $(".c-buy-top")[0];
    const accordion = $(".c-about-accordion");
    const accordOffsetTop = accordion.offset().top - 350;
    $(window).on('scroll', function() {
      if (window.pageYOffset >= accordOffsetTop) {
        buyTop.classList.remove("slide-up");
      } else {
        buyTop.classList.add("slide-up");
      }
    })
  }


  
});
