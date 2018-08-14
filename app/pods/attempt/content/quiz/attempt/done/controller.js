import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  totalCorrect: computed('model.result', function () {
    const result = this.get('model.result')
    return result.questions.reduce((acc, question) => {
      return acc + +question.correctlyAnswered.length
    }, 0)
  }),
  totalIncorrect: computed('model.result', function () {
    const result = this.get('model.result')
    return result.questions.reduce((acc, question) => {
      return acc + +question.incorrectlyAnswered.length
    }, 0)
  })
});
