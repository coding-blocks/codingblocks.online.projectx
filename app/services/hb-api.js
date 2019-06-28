import Service, { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import env from 'codingblocks-online/config/environment';
import fetch from 'fetch';

export default Service.extend({
  session: service(),
  currentUser: service(),

  actions: {
    request: function(url, object) {
      const options = {
        host: env.hackApiHost,
        contentType: 'application/json; charset=utf-8',
        namespace: '/api',
        headers: computed('currentUser.user.hackJwt', function() {
          return {
            Authorization: `JWT ${this.get('currentUser.user.hackJwt')}`,
            'user-id': JSON.parse(
              window.atob(
                this.get('currentUser.user.hackJwt')
                  .split('.')[1]
                  .replace(/-/g, '+')
                  .replace(/_/g, '/')
              )
            ).user.id,
            client: 'online-cb'
          };
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
  }
});
