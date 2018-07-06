import Component from '@ember/component';
import { inject } from '@ember/service';
import $ from 'jquery';
import env from "codingblocks-online/config/environment";

export default Component.extend({
  availableRuns: [],

  loginUrl: `${env.oneauthURL}/oauth/authorize?response_type=code&client_id=${env.clientId}&redirect_uri=${env.publicUrl}`,
  session: inject(),
  router: inject(),

  _redirectToOneauth () {
    window.location.href = this.loginUrl
  },

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

  didInsertElement () {
    this._super(...arguments)
    // hide buy-right and pull buy-top when user scrolls to the top of accrodian
    const buyRight = $(".o-buy-right");
    const buyTop = $(".o-buy-top")[0];
    const accordian = $(".o-about-accordian");
    const accordOffsetTop = accordian.offset().top - 350;
    $(window).on('scroll', function() {
      if (window.pageYOffset >= accordOffsetTop) {
        buyRight.addClass("slide-right");
        buyTop.classList.remove("slide-up");
      } else {
        buyTop.classList.add("slide-up");
        buyRight.removeClass("slide-right");
      }
    })
  },



});
