/* eslint-disable no-case-declarations */

import DS from 'ember-data';
import env from 'codingblocks-online/config/environment';
import { underscore } from '@ember/string';
import TokenAuthorizerMixin from 'ember-simple-auth-token/mixins/token-authorizer';



export default DS.JSONAPIAdapter.extend(TokenAuthorizerMixin, {
    // authorizer: 'authorizer:token',
    host: env.apiHost,
    namespace: 'api/v2',
    pathForType: function (type) {
      const original = this._super(...arguments)
      return underscore(original)
    },
    urlForQueryRecord(query) {
        if(query.custom) {
          switch (query.custom.ext){
            case 'url': {
              let url =  query.custom.url;
              delete query.custom;
              return `${this._super(...arguments)}/${url}`;
            }
          }
        } else  {
          return this._super(...arguments);
        }

      },
      urlForQuery(query) {
        if(query.custom) {
          switch (query.custom.ext) {
            case 'url': {
              let url =  query.custom.url;
              delete query.custom;
              return `${this._super(...arguments)}/${url}`;
            }
          }
        } else  {
          return this._super(...arguments);
        }
      }
});
