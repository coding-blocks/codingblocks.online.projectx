import DS from 'ember-data';
import { computed } from '@ember/object';
import moment from 'moment';

export default DS.Model.extend({
  name: DS.attr(),
  premium: DS.attr(),
  end: DS.attr(),
  endDate: computed('end', function(){
    return moment.unix(this.get('end')).toDate();
  }),
  revoked: DS.attr(),
  certificateApproved: DS.attr(),
  isExpired: computed('end', function () {
    return this.get('end') < +new Date()/1000
  }),
  run: DS.belongsTo('run'),
  user: DS.belongsTo('user'),
  certificate: DS.belongsTo('certificate'),
  rating: DS.attr(),
  notes: DS.hasMany('note'),
  doubts: DS.hasMany('doubt')
})
