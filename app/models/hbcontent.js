import DS from "ember-data";

export default DS.Model.extend({
  name: DS.attr(),
  details: DS.attr(),
  topSubmission: DS.belongsTo('submission'),
  "code-challenge": DS.belongsTo('code-challenge'),
  problem: DS.belongsTo('problem')
})