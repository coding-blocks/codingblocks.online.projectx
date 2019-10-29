import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  headData: service(),

  afterModel() {
    this.set('headData.title', 'Coding Blocks Online | My Courses');
  },
});
