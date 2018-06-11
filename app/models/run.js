import { computed } from '@ember/object';
import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  name: DS.attr(),
  start: DS.attr(),
  end: DS.attr(),
  enrollmentStart: DS.attr (),
  enrollmentEnd: DS.attr (),
  isFree: DS.attr(),
  price: DS.attr(),
  runAttemptId: DS.attr(),
  course: DS.belongsTo('course'),
  user: DS.belongsTo('user'),
  productId: DS.attr(),
  topRunAttempt: Ember.computed('runAttempts', function () {
    return this.get('runAttempts').objectAt(0)
  }),
  runAttempts: DS.hasMany('run-attempt'),
  announcements: DS.hasMany('announcement'),
  percentComplete: DS.attr(),
  isAvailable: computed ('enrollmentStart', 'enrollmentEnd', function () {
    let enrollmentStart = this.get ('enrollmentStart'),
      enrollmentEnd = this.get ('enrollmentEnd'),
      now = Math.floor (moment.now () / 1000)
    ;

    return (enrollmentStart <= now) && (now < enrollmentEnd)
  })
})
