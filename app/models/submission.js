import DS from "ember-data";

export default DS.Model.extend({
  language: DS.attr(),
  score: DS.attr(),
  submitAt: DS.attr(),
  user: DS.belongsTo('user')
})