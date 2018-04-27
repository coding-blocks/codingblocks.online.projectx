import DS from "ember-data";

export default DS.Model.extend({
  text: DS.attr('string'),
  course: DS.belongsTo('course'),
  user: DS.belongsTo('user')
})