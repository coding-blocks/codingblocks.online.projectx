import Component from '@ember/component';
import {inject as service} from '@ember/service';
import { alias, equal }  from '@ember/object/computed';

export default Component.extend({
  store: service(),
  currentUser: service(),
  request: alias('run.runRequests.firstObject'),
  isPending: equal('request.status', 'PENDING'),
  isDeclined: equal('request.status', 'DECLINED'),
  actions: {
    addRequest () {
      const request = this.get('store').createRecord('run-request', {
        run: this.get('run'),
        user: this.get('currentUser.user')
      })
      request.save()
    }
  }
});
