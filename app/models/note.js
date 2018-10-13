import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr(),
  content: DS.belongsTo('content'),
  runAttempt: DS.belongsTo('run-attempt')
})
