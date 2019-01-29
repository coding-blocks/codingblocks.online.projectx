import Component from '@ember/component';

export default Component.extend({
  link: null,
  actions: {
    uploaded (e) {
      this.set('link', e.link);
      this.get('onComplete')(e.link)
    },
    reset () {
      this.set('link', null)
      this.get('onComplete')(null)
      this.set('triggerUpload', false)
    },
    uploadFailed () {
      alert(`Can't Upload file.`)
      this.set('triggerUpload', false)
    }
  }
});
