import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { alias, bool, reads, equal }  from '@ember/object/computed';

export default class navBarComponent extends Component {
    @service session
    @service currentUser
    @service domain
    @service metrics
    @alias('currentUser.user') user

    @equal("domain.domain", "hellointern") isAnotherDomain

    @reads('currentUser.organization') organization
    @bool('organization')  isOrgView
    showSidebar = false

    activeTab = null

    @action
    toggleSidebar () {
      this.toggleProperty('showSidebar')
    }

    didInsertElement () {
      this._super(...arguments)
      this.$(document).on("click", e => {
        this.set('activeTab', false)
      });
    }

    @action
    toggleNotification() {
      if (this.get('activeTab') === 'notification')
        this.set('activeTab', null)
      else
        this.set('activeTab', 'notification')
    }

    @action
    toggleCart() {
      if (this.get('activeTab') === 'cart')
        this.set('activeTab', null)
      else
        this.set('activeTab', 'cart')
    }

    @action
    log(cta) {
      this.get('metrics').trackEvent({event: 'buttonClicked', location: 'navbar', cta})
    }
}
