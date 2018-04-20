import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import env from 'codingblocks-online/config/environment';
import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
    session: service(),
    host: env.hackApiHost,
    contentType: 'application/json; charset=utf-8',
    namespace: '/api'
});
