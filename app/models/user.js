import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr(),
  firstname: DS.attr(),
  lastname: DS.attr(),
  email: DS.attr(),
  hackJwt: DS.attr()
  //contents: DS.hasMany('content'),
  //courseRuns: DS.hasMany('run'),
  //runAttempt: DS.belongsTo('run-attempt')
});