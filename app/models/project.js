import DS from 'ember-data';

export default DS.Model.extend({
  image: DS.attr(),
  description: DS.attr(),
  title: DS.attr(),
  course: DS.belongsTo('course')
})