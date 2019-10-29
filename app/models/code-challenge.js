import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  hbProblemId: DS.attr(),
  content: DS.belongsTo('content'),
  testcases: DS.hasMany('testcase'),
});
