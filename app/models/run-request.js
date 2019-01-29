import DS from 'ember-data';

export default DS.Model.extend({
  status: DS.attr(),
  run: DS.belongsTo('run'),
  user: DS.belongsTo('user')
})
