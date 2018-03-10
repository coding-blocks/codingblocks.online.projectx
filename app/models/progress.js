import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  status: DS.attr(),
  runAttempt: DS.belongsTo('runAttempt'),
  content: DS.belongsTo('content'),
})