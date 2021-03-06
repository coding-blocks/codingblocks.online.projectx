import DS from 'ember-data';
import { computed } from '@ember/object'

export default DS.Model.extend({
  status: DS.attr(),
  feedbackStatus: DS.attr(),
  score: DS.attr('number', { defaultValue: 0 }),
  isDone: computed('status', function () {
    switch (this.get('content.contentable')) {
      case 'code-challenge':
      default:
        return this.status === 'DONE';
    }
  }),
  isActive: computed('status', function(){
    return this.status === 'ACTIVE';
  }),
  isFeedbackDone: computed('feedbackStatus', function() {
    return !(this.feedbackStatus == null);
  }),
  feedback: DS.attr(),
  runAttempt: DS.belongsTo('runAttempt'),
  content: DS.belongsTo('content'),
})
