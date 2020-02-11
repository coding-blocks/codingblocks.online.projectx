import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { dropTask } from 'ember-concurrency-decorators';
import { timeout } from "ember-concurrency";
import { alias } from '@ember/object/computed';

export default class SpinIndexController extends Controller {
  @service api
  @service router
  @service currentUser

  showWinModal = false
  showLoseModal = false
  showTnC = false
  prizeDrawn = null

  @alias('spin.isRunning')
  isSpinning
    
  getTransformForRotation(el, deg) {
    deg += (360 * 5)
    return `rotateZ(${deg}deg)`
  }

  @action
  setWheel(element) {
    this.set('wheel', element)
  }

  @dropTask spin = function *() {
    if (!this.currentUser.user.verifiedemail) {
      this.set('notVerifiedEmailModal', true)
      return;
    }

    if (this.stats.availableSpins <= 0) {
      this.spinsLeftBox.classList.remove('wobble')
      yield timeout(10)
      this.spinsLeftBox.classList.add('wobble')
      return;
    }
    
    const prize = yield this.api.request('/spins/draw', {
      method: 'POST'
    })

    this.wheel.style.transition = 'unset'
    this.wheel.style.transform = "rotateZ(0deg)"
    
    yield timeout(10)
   
    this.wheel.style.transition = '8s ease'
    this.wheel.style.transform = this.getTransformForRotation(this.wheel, prize.rotation)
   
    yield new Promise((resolve) => this.wheel.addEventListener('transitionend', resolve))
    

    if (prize.size > 0) {
      this.setProperties({
        showWinModal: true,
        prizeDrawn: prize
      })
    } else {
      this.setProperties({
        showLoseModal: true,
        prizeDrawn: prize
      })
    }

    yield this.reloadRoute()
  }

  @dropTask tryAgain = function *() {
    yield this.api.request('/jwt/upsert')
    yield this.currentUser.load(true)

    if (!this.currentUser.user.verifiedemail) {
      throw new Error('Email is not verified')
    }

    this.set('notVerifiedEmailModal', false)
    return ;
  }
}
