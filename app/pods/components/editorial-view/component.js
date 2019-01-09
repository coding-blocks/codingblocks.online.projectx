import Component from '@ember/component';

export default Component.extend({
  actions: {
    toggleModal() {
      this.sendAction('toggleModal');
    }
  }
});
