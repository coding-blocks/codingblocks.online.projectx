import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import env from 'codingblocks-online/config/environment';
import AjaxMixin from './ember-ajax-polyfill'
import Service from '@ember/service';

export default Service.extend(AjaxMixin, {
  session: service(),
  host: env.apiHost,
  namespace: '/api/v2',
  headers: computed('session.data.authenticated.jwt', function () {
    let headers = {};
    const jwt = this.get('session.data.authenticated.jwt');
    if (jwt) {
      headers['Authorization'] = `JWT ${jwt}`;
    }
    return headers;
  })
});
