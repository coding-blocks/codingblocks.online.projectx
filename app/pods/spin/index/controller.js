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
    'twitter': text => `http://twitter.com/share?text=${text}&url=https://online.codingblocks.com&hashtags=codingBlocksIN`,
    'facebook': text => `https://www.facebook.com/sharer/sharer.php?u=online.codingblocks.com&quote=${text}`
  }

  @computed('referralCode')
  get shareText() {
    return `Hey, have you found out about Coding Blocks' Valentine’s Campaign? This week of love, Coding Blocks is all set to spread love and learning. Login and unveil CB Box of Love now to win stunning prize. Click on https://cb.lk/join/${this.referralCode} to win an additional heart/box.`
  }

  @computed('referralCode', 'wonPrize.title')
  get shareTextWin() {
    return `
    I am so happy to win ${this.wonPrize.title}. You can also win amazing prizes. Visit https://cb.lk/join/${this.referralCode} to participate in the Campaign and get an extra heart. Hurry up and find what Coding Blocks’s Cupid has in store for you! 
    `
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
    // TODO: Animate Image
    yield new Promise((resolve, reject) => {
      const preloadImage = new Image()
      preloadImage.src = prize.webp
      preloadImage.onload = resolve
      preloadImage.onerror = reject
    })
    const prizeImage = document.getElementById('prize-image')
    prizeImage.src = prize.webp

    yield timeout(3000)
    this.set('wonPrize', prize)

    const content = document.getElementById('content-play')
    content.style.display = 'none'

    const share = document.getElementById('content-share')
    share.style.display = 'block'

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
    window.open(this.linksMap[to](lose ? this.shareText : this.shareTextWin), `${to}-share`, 'width=860,height=840,toolbar=0,menubar=0')
  }

  @action goToShare() {
    const shareBox = document.getElementById("share-box")
    shareBox.scrollIntoView({behavior: "smooth", block: "center" })
  }
}
