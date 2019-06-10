import DS from 'ember-data';

export default DS.Model.extend({
  resumeLink: DS.attr(),
  extra: DS.attr(),
  job: DS.belongsTo('job'),
  user: DS.belongsTo('user'),
})