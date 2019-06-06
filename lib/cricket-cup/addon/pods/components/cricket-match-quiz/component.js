import Component from '@ember/component';
import { action } from '@ember/object';
import { dropTask } from 'ember-concurrency-decorators'
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class CricketMatchQuizComponent extends Component {
  @service store

  @computed('predictions.@each.cricketCupChoice', 'predictions.@each.isNew')
  get recorded() {
    return this.predictions.find(p => p.get('cricketCupChoice.id') && !p.isNew)
  }

  @computed('predictions.@each.cricketCupChoice')
  get submitAllow() {
    return !this.predictions.find(p => !p.get('cricketCupChoice.id')) && !this.recorded
  }

  @computed('recorded')
  get predictionQuestions() {
    return this.questions.map(question => {
      const prediction = this.predictions.findBy('cricketCupQuestion.id', question.get('id'))
      return {
        question,
        prediction
      }
    })
  }

  @dropTask submitTask = function *() {
    yield Promise.all(
      this.predictions.map(p => p.get('cricketCupChoice.id') ? p.save() : p.rollbackAttributes())
    )
  }

  @action
  selectChoice(question, choice) {
    const prediction = this.predictions.find(p => p.get('cricketCupQuestion.id') === question.id)
    prediction.set('cricketCupChoice', choice)
  }
}
