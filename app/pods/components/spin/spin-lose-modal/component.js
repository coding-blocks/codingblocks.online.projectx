import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import { action } from '@ember/object';

export default class SpinLoseModalComponent extends Component{
  @alias('referralCode')
  code

  linksMap = {
    'whatsapp': text => `https://web.whatsapp.com/send?text=${text}`,
    'twitter': text => `http://twitter.com/share?text=${text}&url=https://codingblocks.com/snwtw&hashtags=CodingBlocks,TurnYourLuck&via=codingBlocksIN`,
    'facebook': text => `https://www.facebook.com/sharer/sharer.php?u=https://codingblocks.com/snwfb&quote=${text}`
  }

  @computed('referralCode', 'prize.title')
  get shareText() {
    return `Signup using this link to get Rs 500 in your wallet and stand a chance of winning amazing prizes this Summer using my referral code: https://codingblocks.com/join/${this.code}`
  }

  @action
  share(to) {
    window.open(this.linksMap[to](this.shareText), `${to}-share`, 'width=860,height=840,toolbar=0,menubar=0')
  }
}
