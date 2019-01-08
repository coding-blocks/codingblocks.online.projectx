import DS from 'ember-data';
import { computed } from '@ember/object'

export default DS.Model.extend({
  status: DS.attr(),
  feedbackStatus: DS.attr(),
  isDone: computed('status', function () {
    return this.get('status') === 'DONE'
  }),
  isActive: computed('status', function(){
    return this.get('status') === 'ACTIVE'
  }),
  isFeedbackDone: computed('feedbackStatus', function() {
    return !(this.get('feedbackStatus') == null)
  }),
  runAttempt: DS.belongsTo('runAttempt'),
  content: DS.belongsTo('content'),
})