import Component from '@ember/component';
import ENV from 'codingblocks-online/config/environment'

export default Component.extend({
  actions: {
    redirectToJob(jobId) {
      window.location = ENV.hiringblocksUrl + '/jobs/' + jobId
    }
  }
});
