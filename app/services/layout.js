import Service from '@ember/service';

export default class LayoutService extends Service {
  outsideContainer = null

  setOutsideContainer (el) {
    this.set('outsideContainer', el)
  }
}