import Component from '@ember/component';
import { action } from '@ember-decorators/object';
import { inject as service } from '@ember-decorators/service';
import { alias, bool, reads }  from '@ember-decorators/object/computed';

export default class navBarComponent extends Component {
    @service session
    @service currentUser
    @alias('currentUser.user') user

    @reads('currentUser.organization') organization
    @bool('organization')  isOrgView
    showSidebar = false

    @action
    toggleSidebar () {
      this.toggleProperty('showSidebar')
    }
}
