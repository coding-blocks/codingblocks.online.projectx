import DS from 'ember-data';


export default DS.Model.extend({
  submission: DS.attr(),
  result: DS.attr(),
  status: DS.attr(),
  runAttempt: DS.belongsTo('runAttempt'),
  qna: DS.belongsTo('qna')
})