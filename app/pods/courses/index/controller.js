import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['limit', 'offset'],
  limit: 9,
  offset: 0,

  pageSize: 9,

  actions:{
    loadMore: function() {
      this.set('limit', this.get('limit') + this.get('pageSize'));
    }
  }
})
