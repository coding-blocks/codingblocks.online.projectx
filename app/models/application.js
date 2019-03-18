import DS from 'ember-data';

export default DS.Model.extend({
  job: DS.belongsTo('job'),
  user: DS.belongsTo('user')
})