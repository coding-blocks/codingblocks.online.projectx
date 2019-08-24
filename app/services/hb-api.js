import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import env from 'codingblocks-online/config/environment';
import AjaxMixin from './ember-ajax-polyfill'
import Service from '@ember/service';

export default Service.extend(AjaxMixin, {
    session: service(),
    currentUser: service(),
    host: env.hackApiHost,
    namespace: '/api',
    headers: computed('currentUser.user.hackJwt', function () {
        return {
            Authorization: `JWT ${this.get('currentUser.user.hackJwt')}`,
            'user-id': JSON.parse(window.atob((this.get('currentUser.user.hackJwt').split('.')[1]).replace (/-/g, '+').replace(/_/g, '/'))).id,
            'client': 'online-cb'
        }
    })
});
