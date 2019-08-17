import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import env from 'codingblocks-online/config/environment';
import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
    session: service(),
    currentUser: service(),
    host: env.hackApiHost,
    contentType: 'application/json; charset=utf-8',
    namespace: '/api',
    headers: computed('currentUser.user.hackJwt', function () {
        return {
            Authorization: `JWT ${this.get('currentUser.user.hackJwt')}`,
            'user-id': JSON.parse(window.atob((this.get('currentUser.user.hackJwt').split('.')[1]).replace (/-/g, '+').replace(/_/g, '/'))).id,
            'client': 'online-cb'
        }
    })
});
