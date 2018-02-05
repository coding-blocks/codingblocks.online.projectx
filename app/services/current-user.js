import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
    api: service(),
    store: service(),
    user: null,
    load () {
        return this.get('store').queryRecord('user', { custom: {ext: 'url', url: 'me' }}).then(user => {
            this.set('user', user)
            return user
        })
    }
});
