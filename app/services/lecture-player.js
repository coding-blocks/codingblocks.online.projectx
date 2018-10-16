import Service from '@ember/service';

export default Service.extend({
  element: null,
  active: false,
  setElement (el) {
    this.element = el
  },
  activate () {
    this.set('active', true)
  },
  deactivate () {
    this.set('active', false)
  },
  getCurrentTime () {
    return this.get('element').currentTime
  }
});
