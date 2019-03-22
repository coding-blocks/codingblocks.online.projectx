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
  price: DS.attr('number'),
  mrp: DS.attr('number'),
  unlisted: DS.attr(),
  runAttemptId: DS.attr(),
  certificateTemplate: DS.attr(),
  completionThreshold: DS.attr('number'),
  course: DS.belongsTo('course', {inverse: 'runs'}),
  description:DS.attr(),
  sections: DS.hasMany('sections'),
  user: DS.belongsTo('user'),
  productId: DS.attr(),
  tags: DS.hasMany('tag'),
  contestId: DS.attr(),
  topRunAttempt: computed('runAttempts', function () {
    return this.runAttempts.objectAt(0);
  }),
  isStarted: computed('start', function () {
    return this.start < +new Date()/1000;
  }),
  startString: computed('start', function () {
    return new Date(this.start*1000).toISOString().substring(0, 10);
  }),
  runAttempts: DS.hasMany('run-attempt'),
  announcements: DS.hasMany('announcement'),
  percentComplete: DS.attr(),
  totalContents: computed('sections.@each.contents.@each', function () {
    return this.sections.reduce((acc, section) => {
      return acc + section.get('contents.length')
    }, 0);
  }),
  completedContents: computed('sections.@each.doneContents', function () {
    return this.sections.reduce((acc, section) => {
      return acc + section.get('doneContents.length')
    }, 0);
  }),
  sortedSections: computed('sections.@each', function () {
    return this.sections.sortBy('id');
  }),
  totalContents: computed('sections.@each.totalContents', function () {
    return this.sections.reduce( (acc, section) => {
      return acc + +section.get('totalContents')
    }, 0);
  }),
  isAvailable: computed ('enrollmentStart', 'enrollmentEnd', function () {
    let enrollmentStart = this.enrollmentStart,
      enrollmentEnd = this.enrollmentEnd,
      now = Math.floor (moment.now () / 1000)
    ;
    return (enrollmentStart <= now) && (now < enrollmentEnd) && !this.unlisted;
  }),
  totalDuration: computed ('sections.@each.contents.@each', function () {
    return this.sections.reduce((acc, section) => {
      return acc + section.get('duration')
    }, 0);
  }),
  ta: DS.hasMany('ta'),
  moderators: DS.hasMany('user'),
  runRequests: DS.hasMany('run-request')
})
