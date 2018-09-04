import Component from '@ember/component';
import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';

export default class navBarComponent extends Component {
    @service session
    @service currentUser

    showSidebar = false

    @action
    toggleSidebar () {
      this.toggleProperty('showSidebar')
    }
}
