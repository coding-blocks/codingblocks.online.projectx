import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['transaction_id', 'products_id'],
  transaction_id: null,
  products_id: null

});
