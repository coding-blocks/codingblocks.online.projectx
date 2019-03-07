import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { not }  from '@ember/object/computed';

export default Component.extend({
  shareText: computed('code', function () {
    return 'Purchase any course from online.codingblocks.com and get 500Rs OFF using my referral code at checkout: ' + this.code;
  }),
  api: service(),
  currentUser: service(),
  isVisible: not('currentUser.organization'),
  getReferralCodeTask: task(function  * () {
    const resp = yield this.api.request('users/myReferral')
    this.set('code', resp.code)
  }),
  init () {
    this._super(...arguments)
    this.getReferralCodeTask.perform()
  },
  actions: {
    shareWhatsapp () {
      const shareText = this.shareText
      window.open(`https://web.whatsapp.com/send?text=${shareText}`, 'whatsapp-share', 'width=860,height=840,toolbar=0,menubar=0')
    },
    shareTwitter () {
      const shareText = this.shareText
      window.open(`http://twitter.com/share?text=${shareText}&url=https://online.codingblocks.com&hashtags=codingBlocksIN`, 'twitter-share', 'width=860,height=840,toolbar=0,menubar=0')
    },
    shareFacebook () {
      const shareText = this.shareText
      window.open(`https://www.facebook.com/sharer/sharer.php?u=online.codingblocks.com&quote=${shareText}`, 'facebook-share', 'width=860,height=840,toolbar=0,menubar=0')
    },
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
});
