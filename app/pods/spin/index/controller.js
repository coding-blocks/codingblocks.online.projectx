import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class SpinIndexController extends Controller {
  @service api

  linksMap = {
    'whatsapp': text => `https://web.whatsapp.com/send?text=${text}`,
    'twitter': text => `http://twitter.com/share?text=${text}&url=https://online.codingblocks.com&hashtags=codingBlocksIN`,
    'facebook': text => `https://www.facebook.com/sharer/sharer.php?u=online.codingblocks.com&quote=${text}`
  }

  @computed('referralCode')
  get shareText() {
    return 'Signup using this link to get 500Rs in your wallet or Purchase any course from online.codingblocks.com and get 500Rs extra OFF using my referral code at checkout:' + this.referralCode.code
  }
    
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
  }

  @action
  share(to) {
    window.open(this.linksMap[to](this.shareText), `${to}-share`, 'width=860,height=840,toolbar=0,menubar=0')
  }

  @action
  selectText(containerid) {
    if (document.selection) { // IE
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select();
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
    document.execCommand('copy');
  }
}
