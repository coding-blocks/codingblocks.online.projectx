import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
    // Don't wait for any api request, everything is lazy loaded on the home page
  headData: inject(),
  afterModel(model) {
    this.set('headData.title', 'Coding Blocks Online | Home')
  }
});
