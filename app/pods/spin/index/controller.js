import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SpinIndexController extends Controller {
  @service api

  getTransformForRotation(deg) {
    deg += (360*5)
    return `rotateZ(${deg}deg)`
  }

  @action
  setWheel(element) {
    this.set('wheel', element)
  }

  @action
  async spin() {
    if (this.stats.availableSpins <= 0) {
      alert('you got no spins')
    }
    
    const prize = await this.api.request('/spins/draw', {
      method: 'POST'
    })

    this.wheel.style.transform = this.getTransformForRotation(prize.rotation)

    // confetti shit
  }
}
