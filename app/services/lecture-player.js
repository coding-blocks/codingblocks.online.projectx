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
  },
  seek (time) {
    if (!this.element) {
      throw new Error('Cannot seek lecture-player, no element is present!')
    }
    
    this.element.currentTime = time
  }
});
