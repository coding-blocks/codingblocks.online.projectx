import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import DS from 'ember-data';

export default Controller.extend({
  queryParams: ['q'],
  q: 1,

  store: service(),
  api: service(),
  getQuestionTask: task(function * (id) {
    const question = yield this.get('store').findRecord('question', id, {
      include: 'choices',
      reload: true
    })

    const submission = this.get('quizAttempt.submission')
    if (!submission || !Array.isArray(submission)) {
      question.set("markedChoices", [])
      return question
    }
    
    const questionSubmission = submission.find(el => el && el.id == question.id)
    if (!questionSubmission) {
      question.set("markedChoices", [])
    } else {
      console.log(questionSubmission)
      question.set("markedChoices", questionSubmission["marked-choices"])
    }
    return question
  }),
  currentQuestion: computed('q', function () {
    const question = this.get('questions').objectAt(this.get('q')-1)

    return DS.PromiseObject.create({
      promise: this.get('getQuestionTask').perform(question.id)
    })
  }),

  markChoice: task( function *(question, choice) {
    let submission = this.get('quizAttempt.submission')
    if (!Array.isArray(submission)) {
      console.error('Quiz Submission must be an array')
      submission = []
    } 

    const questionSubmission = submission.find(el => el.id == question.get('id'))

    if (!questionSubmission) {
      submission = [{
        id: question.get('id'),
        "marked-choices": [choice.id]
      }, ...submission]
      question.set("markedChoices", [choice.id])
    } else {
      var markedChoicesSet = new Set(questionSubmission["marked-choices"])
      if (markedChoicesSet.has(choice.id)) {
        markedChoicesSet.clear()
      } else {
        markedChoicesSet.clear()
        markedChoicesSet.add(choice.id)
      }
      questionSubmission["marked-choices"] = [...markedChoicesSet.values()]
      question.set('markedChoices', [...markedChoicesSet.values()])
    }

    this.set('quizAttempt.submission', [...submission])
    yield this.get('quizAttempt').save()

    
  }),
  
  actions: {
    changeQuestion (offset) {
      this.incrementProperty('q', offset)
    },
    goToQuestion (index) {
      this.set('q', index)
    },
    submitQuiz () {
      const quizAttemptId = this.get('quizAttempt.id')
      this.get('api').request(`/quiz_attempts/${quizAttemptId}/submit`, {
        method: 'POST'
      }).then(response => {
        this.get('store').pushPayload(response)
        this.transitionToRoute('attempt.content.quiz.attempt.done')
      })
    }
  }

});
