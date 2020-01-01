import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  submission: DS.attr(),
  result: DS.attr(),
  status: DS.attr(),
  createdAt: DS.attr(),
  runAttempt: DS.belongsTo('runAttempt'),
  qna: DS.belongsTo('qna'),
  totalCorrect: Ember.computed('result', function () {
    if (this.result) {
      return this.result.questions.reduce((acc, question) => {
        return acc + +question.correctlyAnswered.length
      }, 0)
    }
  }),
  totalIncorrect: Ember.computed('result', function () {
    if (this.result) {
      return this.result.questions.reduce((acc, question) => {
        return acc + +question.incorrectlyAnswered.length
      }, 0)
    }
  })
})