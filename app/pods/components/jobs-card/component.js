import Component from '@ember/component';

export default Component.extend({
  actions: {
    setRedirectUrl(jobId) {
      localStorage.setItem('redirectionPath', "/app/jobs/listing/" +  jobId)
    }
  }
});
