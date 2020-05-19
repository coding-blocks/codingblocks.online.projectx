import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import config from 'codingblocks-online/config/environment';
import { slugify } from 'codingblocks-online/utils/content'
import { action } from '@ember/object';

export default class PlayerTabsDoubtSupportStripComponent extends Component {
  @service player
  @service store

  showUpgradeModal = false

  @computed('runAttempt')
  get hideDoubtSupport() {
    const { doubtSupport } = this.runAttempt
    return !doubtSupport || isNaN(doubtSupport.getTime())
  }
  
  @equal('runAttempt.runTier', 'LITE')
  doubtSupportNotAvailableForThisTier

  @computed('player.contentId')
  get communityForumLink() {
    const content = this.store.peekRecord('content', this.player.contentId)
    return `${config.discussBaseUrl}/tag/${slugify(content.title)}`
  }

  @action
  handleAskDoubtClick() {
    if (this.runAttempt.runTier === 'LITE')
      this.set('showUpgradeModal', true)
    else
      this.onAskDoubt()
  }
}