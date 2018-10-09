import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  totalCorrect: computed('quizAttempt.result', function () {
    const result = this.get('quizAttempt.result')
    return result.questions.reduce((acc, question) => {
      return acc + +question.correctlyAnswered.length
    }, 0)
  }),
  totalIncorrect: computed('quizAttempt.result', function () {
    const result = this.get('quizAttempt.result')
    return result.questions.reduce((acc, question) => {
      return acc + +question.incorrectlyAnswered.length
    }, 0)
  })
});
