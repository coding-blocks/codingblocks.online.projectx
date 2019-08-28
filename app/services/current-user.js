import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { alias }  from '@ember/object/computed';
import { reads } from '@ember/object/computed';

export default Service.extend({
    api: service(),
    store: service(),
    user: {},
    organization: alias('user.organization'),
    fastboot: service(),
    isFastBoot: reads('fastboot.isFastBoot'),
    init () {
        // restore org from store
        if (!this.isFastBoot)
            this.set("organization", window.localStorage.getItem('org'))
    },
    load () {
        const currentUser = this.user
        if (currentUser && currentUser.id) {
            return Promise.resolve(currentUser)
        }
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
