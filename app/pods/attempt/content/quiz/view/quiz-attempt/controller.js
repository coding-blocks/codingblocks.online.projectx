import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  q: 1,
  incorrectQuestionIds: computed('quizAttempt.result', function () {
    const questions = this.get('quizAttempt.result.questions')
    return questions.filter(q => q.score == 0).mapBy('id')
  }),
  correctQuestionIds: computed('quizAttempt.result', function () {
    const questions = this.get('quizAttempt.result.questions')
    return questions.filter(q => q.score > 0).mapBy('id')
  }),
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
    setQuestion (index) {
      this.set('q', index+1)
    },
    nextQuestion() {
      this.incrementProperty('q')
    },
    prevQuestion() {
      this.decrementProperty('q')
    }
  }
});
