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
  mrp: DS.attr(),
  runAttemptId: DS.attr(),
  certificateTemplate: DS.attr(),
  course: DS.belongsTo('course'),
  description:DS.attr(),
  sections: DS.hasMany('sections'),
  user: DS.belongsTo('user'),
  productId: DS.attr(),
  tags: DS.hasMany('tag'),
  topRunAttempt: Ember.computed('runAttempts', function () {
    return this.get('runAttempts').objectAt(0)
  }),
  runAttempts: DS.hasMany('run-attempt'),
  announcements: DS.hasMany('announcement'),
  percentComplete: DS.attr(),
  totalContents: computed('sections.@each.contents.@each', function () {
    return this.get('sections').reduce((acc, section) => {
      return acc + section.get('contents.length')
    }, 0)
  }),
  completedContents: computed('sections.@each.doneContents', function () {
    return this.get('sections').reduce((acc, section) => {
      return acc + section.get('doneContents.length')
    }, 0)
  }),
  sortedSections: computed('sections.@each', function () {
    return this.get('sections').sortBy('id')
  }),
  totalContents: computed('sections.@each.totalContents', function () {
    return this.get('sections').reduce( (acc, section) => {
      return acc + +section.get('totalContents')
    }, 0)
  }),
  isAvailable: computed ('enrollmentStart', 'enrollmentEnd', function () {
    let enrollmentStart = this.get ('enrollmentStart'),
      enrollmentEnd = this.get ('enrollmentEnd'),
      now = Math.floor (moment.now () / 1000)
    ;
    return (enrollmentStart <= now) && (now < enrollmentEnd)
  })
})
