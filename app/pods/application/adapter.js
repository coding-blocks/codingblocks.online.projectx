/* eslint-disable no-case-declarations */

import DS from 'ember-data';
import env from 'codingblocks-online/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';


export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
    authorizer: 'authorizer:token',
    host: env.apiHost,
    namespace: 'api',
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
