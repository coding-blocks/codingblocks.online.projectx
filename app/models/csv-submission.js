import DS from 'ember-data';
import { equal }  from '@ember/object/computed';

export default DS.Model.extend({
  score: DS.attr('number'),
  status: DS.attr(),
  outputUrl: DS.attr(),
  createdAt: DS.attr(),
  csv: DS.belongsTo('csv'),
  runAttempt: DS.belongsTo('run-attempt'),
  isPending: equal('status', 'pending'),
  isSuccess: equal('status', 'success'),
  isErrored: equal('status', 'errored')
})