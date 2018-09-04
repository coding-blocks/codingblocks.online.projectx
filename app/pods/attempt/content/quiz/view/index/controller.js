import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  queryParams: ['q'],
  q: 1,
  incorrectIds: computed('quizAttempt.result', 'question.id',function () {
    const result = this.get('quizAttempt.result')
    const question = result.questions.find(el => el.id == this.get('question.id'))
    return question.incorrectlyAnswered.mapBy('id')
  }),
  correctIds: computed('quizAttempt.result', 'question.id', function () {
    const result = this.get('quizAttempt.result')
    const question = result.questions.find(el => el.id == this.get('question.id'))
    const set = new Set([...question.correctlyAnswered.mapBy('id'), ...question.answers])
    return [...set.values()]
  }),
  actions: {
    changeQuestion (index) {
      this.incrementProperty('q', index)
    }
  }
});
