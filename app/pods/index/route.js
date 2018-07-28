import Route from '@ember/routing/route';

export default Route.extend({
    // Don't wait for any api request, everything is lazy loaded on the home page
  headData: Ember.inject.service(),
  afterModel(model) {
    this.set('headData.title', 'Coding Blocks Online | Home')
  }
});
