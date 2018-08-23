import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  name: DS.attr(),
  premium: DS.attr(),
  end: DS.attr(),
  revoked: DS.attr(),
  isExpired: computed('end', function () {
    return this.get('end') < +new Date()/1000
  }),
  run: DS.belongsTo('run'),
  user: DS.belongsTo('user'),
})