import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['oneauth_id', 'transaction_id', 'products_id'],
  transaction_id: null,
  products_id: null

});
