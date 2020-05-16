import DS from 'ember-data';
import { computed } from '@ember/object';
import moment from 'moment';

export default DS.Model.extend({
  name: DS.attr(),
  premium: DS.attr(),
  end: DS.attr(),
  revoked: DS.attr(),
  certificateApproved: DS.attr(),
  rating: DS.attr(),
  runTier: DS.attr(),
  completedContents: DS.attr('number'),
  approvalRequested: DS.attr('boolean'),
  doubtSupport: DS.attr('date'),
  paused: DS.attr('boolean'),
  pause_time_left: DS.attr(),
  last_paused_at: DS.attr('date'),
  run: DS.belongsTo('run'),
  user: DS.belongsTo('user'),
  certificate: DS.belongsTo('certificate'),
  notes: DS.hasMany('note'),
  doubts: DS.hasMany('doubt'),
  endDate: computed('end', function(){
    return moment.unix(this.end).toDate();
  }),
  isExpired: computed('end', function () {
    return this.end < +new Date()/1000;
  }),
  progressPercent: computed('completedContents', 'run.totalContents', function () {
    const totalContents = this.get('run.totalContents')
    const completedContents = this.completedContents || 0
    return totalContents == 0 ? 0 : Math.floor(completedContents * 100 / totalContents)
  }),
  isPausable: computed('runTier', 'pause_time_left', function () {
    return (this.runTier == 'PREMIUM' || this.runTier == null) && (this.pause_time_left >= (1 * 24 * 60 * 60 * 1000))
  })
})
