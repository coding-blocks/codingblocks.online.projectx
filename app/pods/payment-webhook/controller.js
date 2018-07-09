import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['transaction_id', 'product_ids'],
  transaction_id: null,
  product_ids: null
});
