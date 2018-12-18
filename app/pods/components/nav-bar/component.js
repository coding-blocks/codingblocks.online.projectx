import Component from '@ember/component';
import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';
import { alias, bool }  from 'ember-decorators/object/computed';

export default class navBarComponent extends Component {
    @service session
    @service currentUser
    @alias('currentUser.user') user

    @bool('user.organization') isOrgView
    showSidebar = false

    @action
    toggleSidebar () {
      this.toggleProperty('showSidebar')
    }
}
