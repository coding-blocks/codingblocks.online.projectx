import Component from '@ember/component';
import { action } from '@ember/object';
import { dropTask } from 'ember-concurrency-decorators'
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class CricketMatchQuizComponent extends Component {
  @service store

  // @computed('predictions.@each.cricketCupChoice', 'predictions.@each.isNew')
  // get recorded() {
  //   return this.predictions.find(p => p.get('cricketCupChoice.id') && !p.isNew)
  // }

  @computed('questions.@each.selectedChoice')
  get submitAllow() {
    return !this.questions.find(q => !q.get('selectedChoice.id'))
  }

  // @computed('predictions.@each.cricketCupChoice')
  // get predictionQuestions() {
  //   return this.questions.map(question => {
  //     const prediction = this.predictions.findBy('cricketCupQuestion.id', question.get('id'))
  //     return {
  //       question,
  //       prediction
  //     }
  //   })
  // }

  @dropTask submitTask = function *() {
    const predictions = this.questions.filter(question => question.selectedChoice).map(question =>  {
      const pred =  this.store.createRecord('cricketCupUserPrediction', {
        cricketCupQuestion: question,
        cricketCupMatch: question.cricketCupMatch,
        cricketCupChoice: question.selectChoice
      })
      return pred.save()
    })

    yield Promise.all(predictions)
    // yield Promise.all(
    //   this.predictions.map(p => p.get('cricketCupChoice.id') ? p.save() : p.rollbackAttributes())
    // )
  }
}
