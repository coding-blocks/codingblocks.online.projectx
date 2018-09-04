import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  username: DS.attr(),
  firstname: DS.attr(),
  lastname: DS.attr(),
  email: DS.attr(),
  hackJwt: DS.attr(),
  lastReadNotification: DS.attr (),
  photo: DS.attr(),
  oneauthId: DS.attr()
  //contents: DS.hasMany('content'),
  //courseRuns: DS.hasMany('run'),
  //runAttempt: DS.belongsTo('run-attempt')
});
