import Component from '@ember/component';

export default Component.extend({
  actions: {
    uploaded (e) {
      this.onComplete(e.link)
      this.set('triggerUpload', false)
    },
    reset () {
      this.onComplete(null)
      this.set('triggerUpload', false)
    },
    uploadFailed () {
      alert(`Can't Upload file.`)
      this.set('triggerUpload', false)
    }
  }
});
