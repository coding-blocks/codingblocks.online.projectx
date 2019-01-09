import DS from 'ember-data';

export default DS.Model.extend({
  input: DS.attr(), 
  expectedOutput: DS.attr(),
  "code-challenge": DS.belongsTo('code-challenge')
})