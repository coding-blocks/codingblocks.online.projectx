import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    startQuiz () {
      this.get('model.newQuizAttempt').save().then(quizAttempt => {
        this.transitionToRoute('attempt.content.quiz.attempt', quizAttempt.id, {
          queryParams: {
            s: this.get('model.sectionId')
          }
        })
      })
    }
  }
});
