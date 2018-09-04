import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  api: service(),
  getReferralCodeTask: task(function  * () {
    const resp = yield this.get('api').request('users/myReferral')
    this.set('code', resp.code)
  }),
  init () {
    this._super(...arguments)
    this.get('getReferralCodeTask').perform()
  }
});
