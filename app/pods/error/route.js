import Route from '@ember/routing/route';

export default Route.extend({
  errors: {
    USER_EMAIL_NOT_VERIFIED: `You need to verify your email before you can acess any of our courses. You can do so on the <a href="https://account.codingblocks.com/" style="text-decoration: underline; color: blue">profile page here.</a><br> <p>If you have already verified your email and still seeing this, you need to logout, and log In again.</p>`,
    NO_CONTENT: `There is not content to display for this course yet. Please try again later, or ask your mentor/support about this.`,
    DUKKAN_ERROR: `There was some error in communicating to dukaan.codingblocks.com. Please Contact Codingblocks Support`
  },
  queryParams: {
    errorCode: {
      refreshModel: true
    }
  },
  model(params) {
    return this.errors[params.errorCode]
  }
});
