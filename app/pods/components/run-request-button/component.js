import Component from '@ember/component';
import {inject as service} from '@ember/service';
import { alias, equal }  from '@ember/object/computed';
import { forceLogin } from 'codingblocks-online/utils/session'

export default Component.extend({
  store: service(),
  currentUser: service(),
  session: service(),
  request: alias('run.runRequests.firstObject'),
  isPending: equal('request.status', 'PENDING'),
  isDeclined: equal('request.status', 'DECLINED'),
  isAccepted: equal('request.status', 'ACCEPTED'),
  actions: {
    addRequest () {
      // if user is not loggedIn; have him logged In
      if (!this.get('session.isAuthenticated')) {
        return forceLogin()
      }

      const request = this.get('store').createRecord('run-request', {
        run: this.get('run'),
        user: this.get('currentUser.user')
      })
      request.save()
    }
  }
});
