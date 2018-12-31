import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { alias }  from '@ember/object/computed';

export default Service.extend({
    api: service(),
    store: service(),
    user: {},
    organization: alias('user.organization'),
    init () {
        // restore org from store
        this.set("organization", window.localStorage.getItem('org'))
    },
    load () {
        const currentUser = this.get('user')
        if (currentUser && currentUser.id) {
            return Promise.resolve(currentUser)
        }
        return this.get('store').queryRecord('user', { custom: {ext: 'url', url: 'me' }}).then(user => {
            this.set('user', user)
            console.log('Org', user.get('organization'))
            this.setOrg(user.get('organization'))
            return user
        })
    },
    setOrg (org) {
        console.log("Called setOrg with", org)
        this.set('organization', org)
        window.localStorage.setItem('org', org)
    }
});
