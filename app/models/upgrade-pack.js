import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  description: DS.attr(),
  to: DS.attr(),
  price: DS.attr(),
  toRunId: DS.attr('number'),
  productId: DS.attr('number'),
  course: DS.belongsTo('course')
})