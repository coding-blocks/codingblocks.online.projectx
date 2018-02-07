import Component from '@ember/component';
import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';

export default class navBarComponent extends Component {
    @service session
    @service api

    @action
    invalidateSession () {
        this.get('api').request('/jwt/logout').then (() => this.get('session').invalidate())
    }
}
