import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  premium: DS.attr(),
  run: DS.belongsTo('run'),
  user: DS.belongsTo('user'),
  rating: DS.attr()
})
