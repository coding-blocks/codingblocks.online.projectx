import Route from '@ember/routing/route';

export default Route.extend({
  // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
  errors: {
    PAYMENT_FAILED:
      'Please retry the payment by going to <a href="https://dukaan.codingblocks.com/mycart" style="text-decoration: underline; color: blue">Your cart.</a>',
    USER_EMAIL_NOT_VERIFIED: `You need to verify your email before you can access any of our courses. You can do so on the <a href="https://account.codingblocks.com/" style="text-decoration: underline; color: blue">profile page here.</a><br> <p>If you have already verified your email and still seeing this, you need to logout, and log In again.</p>`,
    NO_CONTENT: `There is not content to display for this course yet. Please try again later, or ask your mentor/support about this.`,
    DUKKAN_ERROR: `You already have a product in your cart. Please complete your payment by going to <a href="https://dukaan.codingblocks.com/mycart" style="text-decoration: underline; color: blue">your cart</a>  or contact coding blocks support for any further help.`,
    NO_USER_MOBILE_NUMBER: `You need to add your mobile number before you can access any of our courses. You can do so on the <a href="https://account.codingblocks.com/" style="text-decoration: underline; color: blue">profile page here.</a><br> <p>If you have already added your mobile and still seeing this, you need to logout, and log In again.</p>`,
  },
  queryParams: {
    errorCode: {
      refreshModel: true,
    },
  },
  model(params) {
    return this.errors[params.errorCode];
  },
});
