import Component from '@ember/component';
import { action } from '@ember/object';
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

  
}
