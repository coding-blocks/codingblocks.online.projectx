import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['offset', 'limit'],
  visible: true,
  offset: 0,
  limit: 3,
  actions: {
    updatePage: function() {
      this.set("limit", this.get("meta.pagination.nextOffset")+this.get('limit'));
      if(this.get("limit") >= this.get("meta.pagination.count")) {
          this.set('visible', false);
      }
    }
  }
});
