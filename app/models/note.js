import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr(),
  duration: DS.attr('number'),
  content: DS.belongsTo('content'),
  runAttempt: DS.belongsTo('run-attempt')
})
