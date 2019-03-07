import Component from '@ember/component';
import { inject } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: inject(),

  didReceiveAttrs(){
    this._super(...arguments);
    this.set('ratingsArray', []);
    this.fetchRatingsTask.perform();
  },

  actions: {
    fetchRatings() {
      this.fetchRatingsTask.perform();
    }
  },

  fetchRatingsTask: task(function* () {
    this.store.query('rating', {
      custom: { ext: 'url', url: `course/${this.courseId}` },
      page:{
        offset: this.get('meta.nextOffset') ^ 0,
        limit: 10
      }
    }).then(result => {
      this.ratingsArray.pushObjects(result.toArray())
      this.set('meta', result.meta.pagination);
    })
  })
});
