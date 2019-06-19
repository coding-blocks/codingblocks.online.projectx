import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import env from 'codingblocks-online/config/environment';
import fetch from 'fetch';

export default {
  request: function(url, object) {
    const options = {
      session: service(),
      host: env.apiHost,
      contentType: 'application/json; charset=utf-8',
      namespace: '/api/v2',
      headers: computed('session.data.authenticated.jwt', function() {
        let headers = {};
        const jwt = this.get('session.data.authenticated.jwt');
        if (jwt) {
          headers['Authorization'] = `JWT ${jwt}`;
        }
        return headers;
      })
    };

    if (object && object.data) {
      const body = object.data;
      options.body = JSON.stringify(body);
    }

    if (object && object.method) {
      options.method = object.method;
    }

    return fetch(url, options);
  }
};
