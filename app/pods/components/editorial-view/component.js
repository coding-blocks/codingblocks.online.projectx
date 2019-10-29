import Component from '@ember/component';

export default Component.extend({
  actions: {
    toggleModal() {
      // eslint-disable-next-line ember/closure-actions
      this.sendAction('toggleModal');
    },
  },
});
