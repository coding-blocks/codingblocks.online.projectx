import Component from '@ember/component';
import { action, computed } from '@ember/object';

export default class SpinShare extends Component {
  linksMap = {
    'whatsapp': text => `https://web.whatsapp.com/send?text=${text}`,
    'twitter': text => `http://twitter.com/share?text=${text}&url=https://online.codingblocks.com&hashtags=codingBlocksIN`,
    'facebook': text => `https://www.facebook.com/sharer/sharer.php?u=online.codingblocks.com&quote=${text}`
  }

  @computed('referralCode')
  get shareText() {
    return `Sign-up using my link to get instant 500 in your wallet and Spin the CB Wheel to win assured prizes this Christmas and New Year using my referral link: https://cb.lk/join/${this.referralCode.code}  @codingblocksIn

    #CodingBlocks #CBSanta #Christmas #NewYear`
  }

  @action
  selectText(containerid) {
    if (document.selection) { // IE
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select();
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNodeContents(document.getElementById(containerid));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
    document.execCommand('copy');
  }

  @action
  share(to) {
    window.open(this.linksMap[to](this.shareText), `${to}-share`, 'width=860,height=840,toolbar=0,menubar=0')
  }
}
