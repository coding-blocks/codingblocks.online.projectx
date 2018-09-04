import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  incorrectQuestionIds: computed('quizAttempt.result', function () {
    const questions = this.get('quizAttempt.result.questions')
    return questions.filter(q => q.score == 0).mapBy('id')
  }),
  correctQuestionIds: computed('quizAttempt.result', function () {
    const questions = this.get('quizAttempt.result.questions')
    return questions.filter(q => q.score > 0).mapBy('id')
  }),
  actions: {
    setQuestion (index) {
      this.transitionToRoute('attempt.content.quiz.view.index', {
        queryParams: {
          q: index+1
        }
      })
    }
  }
});
