import Route from '@ember/routing/route';

export default Route.extend({
    headData: Ember.inject.service(),

    afterModel(model) {
      this.set('headData.title', 'Coding Blocks Online | My Courses')
    }
});
