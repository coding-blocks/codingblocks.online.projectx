import Component from '@ember/component';
import { action } from '@ember/object';
import { computed } from '@ember/object';

export default class SpinWinModalComponent extends Component {

  linksMap = {
    'whatsapp': text => `https://web.whatsapp.com/send?text=${text}`,
    'twitter': text => `http://twitter.com/share?text=${text}&url=https://online.codingblocks.com/spin&hashtags=TurnYourLuck,CodingBlocks`,
    'facebook': text => `https://www.facebook.com/sharer/sharer.php?u=online.codingblocks.com&quote=${text}`
  }

  @computed('referralCode', 'prize.title')
  get shareText() {
    return `I am ecstatic to share that I have won ${this.prize.title} in Coding Blocks’s new Summer Learning Spree Campaign. Don’t wait any further. You can also win amazing prizes. Click on <LINK> to participate in the Campaign and get an extra spin. #TurnYourLuck #CodingBlocks`
  }

  @action
  share(to) {
    window.open(this.linksMap[to](this.shareText), `${to}-share`, 'width=860,height=840,toolbar=0,menubar=0')
  }
}
