import DS from 'ember-data';
import env from 'codingblocks-online/config/environment';

export default DS.JSONAPIAdapter.extend({
    host: env.apiHost,
    namespace: 'api'
});
