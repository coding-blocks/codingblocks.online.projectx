import DS from 'ember-data';
import { computed } from '@ember/object'

export default DS.Model.extend({
  status: DS.attr(),
  isDone: computed('status', function () {
    return this.get('status') === 'DONE'
  }),
  runAttempt: DS.belongsTo('runAttempt'),
  content: DS.belongsTo('content'),
})