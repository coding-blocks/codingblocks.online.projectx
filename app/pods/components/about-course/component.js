import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({
  availableRuns: [],

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
  }
});
