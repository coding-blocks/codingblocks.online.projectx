import DS from 'ember-data';
import { computed } from '@ember/object';
import moment from 'moment';

export default DS.Model.extend({
  name: DS.attr(),
  premium: DS.attr(),
  end: DS.attr('number'),
  revoked: DS.attr(),
  certificateApproved: DS.attr(),
  rating: DS.attr(),
  runTier: DS.attr(),
  completedContents: DS.attr('number'),
  approvalRequested: DS.attr('boolean'),
  doubtSupport: DS.attr('date'),
  paused: DS.attr('boolean'),
  pauseTimeLeft: DS.attr('number'),
  lastPausedAt: DS.attr('date'),
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
  isPausable: computed('runTier', 'pauseTimeLeft', function () {
    return (
      this.premium &&
      !this.isExpired &&
      (this.runTier == 'PREMIUM' || this.runTier == null) &&
      (this.pauseTimeLeft >= (1 * 24 * 60 * 60 * 1000))
    )
  })
})
