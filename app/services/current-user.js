import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { alias }  from '@ember/object/computed';

export default Service.extend({
    api: service(),
    store: service(),
    user: null,
    organization: alias('user.organization'),
    load () {
        const currentUser = this.get('user')
        if (currentUser) {
            return Promise.resolve(currentUser)
        }
        return this.get('store').queryRecord('user', { custom: {ext: 'url', url: 'me' }}).then(user => {
            this.set('user', user)
            return user
        })
    }
});
