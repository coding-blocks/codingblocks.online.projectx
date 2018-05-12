import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['offset', 'limit'],
  visible: true,
  offset: 0, 
  limit: 5,
});
