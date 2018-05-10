import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['offset', 'limit'],
  offset: 0, // Defaults
  limit: 3,
  actions: {
    updatePage: function() {
      this.set("limit",this.get("meta.pagination.nextOffset")+this.get('limit'));
    }
  }
});
