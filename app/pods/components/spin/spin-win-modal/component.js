import Component from '@ember/component';
import { action } from '@ember/object';
import { computed } from '@ember/object';

export default class SpinWinModalComponent extends Component {

  linksMap = {
    'whatsapp': text => `https://web.whatsapp.com/send?text=${text}`,
    'twitter': text => `http://twitter.com/share?text=${text}&url=https://online.codingblocks.com/spin&hashtags=CBSanta`,
    'facebook': text => `https://www.facebook.com/sharer/sharer.php?u=online.codingblocks.com&quote=${text}`
  }

  @computed('referralCode', 'prize.title')
  get shareText() {
    return `I just won ${this.prize.title} on Coding Blocks Spin-n-Win. Signup using this link to get 500 in your Coding Blocks wallet and get a chance to spin and win exciting prizes this Christmas with Coding Blocks: https://cb.lk/join/${this.referralCode}`
  }

  @action
  share(to) {
    window.open(this.linksMap[to](this.shareText), `${to}-share`, 'width=860,height=840,toolbar=0,menubar=0')
  }
}
