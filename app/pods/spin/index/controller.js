import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { dropTask } from 'ember-concurrency-decorators';
import { timeout } from "ember-concurrency";

export default class SpinIndexController extends Controller {
  @service api
  @service router
  @service currentUser

  showTnC = false
  prizeDrawn = null

  linksMap = {
    'whatsapp': text => `https://web.whatsapp.com/send?text=${text}`,
    'twitter': text => `http://twitter.com/share?text=${text}&url=https://cb.lk/vdoncb&hashtags=codingBlocksIN,CBVDay&via=codingBlocksIN`,
    'facebook': text => `https://www.facebook.com/sharer/sharer.php?u=https://cb.lk/vdfb&quote=${text}`
  }

  @computed('referralCode')
  get shareText() {
    return `Hey, have you found out about Coding Blocks' Valentine’s Campaign? This week of love, Coding Blocks is all set to spread love and learning. Click on https://cb.lk/join/${this.referralCode} to win an additional heart.`
  }

  @computed('referralCode', 'wonPrize.title')
  get shareTextWin() {
    return `I won ${this.wonPrize.title} from Coding Blocks. So, hurry up and participate in the Campaign. Click on https://cb.lk/join/${this.referralCode} to win an additional heart. The offer expires soon.`
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

  @action
  share(to, lose = true) {
    const url = window.encodeURI(this.linksMap[to](lose ? this.shareText : this.shareTextWin))
    window.open(url, `${to}-share`, 'width=860,height=840,toolbar=0,menubar=0')
  }

  @action goToShare() {
    const shareBox = document.getElementById("share-box")
    shareBox.scrollIntoView({behavior: "smooth", block: "center" })
  }
}
