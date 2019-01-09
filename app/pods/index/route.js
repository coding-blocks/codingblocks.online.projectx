import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default Route.extend({
    // Don't wait for any api request, everything is lazy loaded on the home page
  headData: Ember.inject.service(),
  currentUser: service(),
  beforeModel () {
    if(this.get('currentUser.organization')) {
      this.transitionTo(this.get('currentUser.organization'))
    }
    return this._super(...arguments)
  },
  afterModel(model) {
    this.set('headData.title', 'Coding Blocks Online | Home')
  },

});
