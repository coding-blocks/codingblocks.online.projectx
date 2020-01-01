import DS from 'ember-data';
import { computed } from '@ember/object'

export default DS.Model.extend({
  status: DS.attr(),
  feedbackStatus: DS.attr(),
  isDone: computed('status', function () {
    return this.status === 'DONE';
  }),
  isActive: computed('status', function(){
    return this.status === 'ACTIVE';
  }),
  isFeedbackDone: computed('feedbackStatus', function() {
    return !(this.feedbackStatus == null);
  }),
  run_attempt: DS.belongsTo('runAttempt'),
  content: DS.belongsTo('content'),
})