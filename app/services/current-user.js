import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { alias }  from '@ember/object/computed';

export default Service.extend({
    api: service(),
    store: service(),
    session: service(),
    user: {},
    organization: alias('user.organization'),
    init () {
        // restore org from store
        this.set("organization", window.localStorage.getItem('org'))
    },
    load () {
        const currentUser = this.user
        if (currentUser && currentUser.id) {
            return Promise.resolve(currentUser)
        }
        document.cookie = `auth-jwt=${this.get('session.data.authenticated.jwt')}; path=/`

        return this.store.queryRecord('user', { custom: {ext: 'url', url: 'me' }}).then(user => {
            this.set('user', user)
            this.setOrg(user.get('organization'))
            return user
        });
    },
    setOrg (org) {
        this.set('organization', org)
    }
});
