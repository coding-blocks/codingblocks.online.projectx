import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  start: DS.attr(),
  end: DS.attr(),
  isFree: DS.attr(),
  price: DS.attr(),
  runAttemptId: DS.attr(),
  course: DS.belongsTo('course'),
  user: DS.belongsTo('user'),
  topRunAttempt: Ember.computed('runAttempts', function () {
    return this.get('runAttempts').objectAt(0)
  }),
  runAttempts: DS.hasMany('run-attempt'),
  announcements: DS.hasMany('announcement'),
  percentComplete: DS.attr()
})
