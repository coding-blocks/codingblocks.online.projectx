import DS from 'ember-data'

export default DS.Model.extend({
  score: DS.attr('number'),
  type: DS.attr(),
  description: DS.attr(),
  ratedById: DS.attr(),
  doubt: DS.belongsTo('doubt')
})