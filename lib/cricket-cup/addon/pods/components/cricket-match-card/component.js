import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service'
import { dropTask } from 'ember-concurrency-decorators'
import moment from 'moment';

export default class CricketMatchCardComponent extends Component {
  @service store

  didReceiveAttrs() {
    this._super(...arguments);
    this.fetchPredictions.perform()
  }
    

  @computed('match.predictionEnd')
  get predictionEndTime() {
    return moment(this.match.predictionEnd)
  }

  @computed('match.predictionEnd')
  get hasPredictionEnded() {
    return moment() > this.predictionEndTime
  }

  @dropTask fetchPredictions = function *() {
    const predictions = yield this.store.query('cricketCupUserPrediction', {
      filter: {
        cricketCupMatchId: this.match.id
      }
    })
    this.set('predictions', predictions)
  }

  @dropTask submitTask = function *() {
    const predictions = this.questions.filter(question => question.selectedChoice).map(question =>  {
      const pred =  this.store.createRecord('cricketCupUserPrediction', {
        cricketCupQuestion: question,
        cricketCupMatch: question.cricketCupMatch,
        cricketCupChoice: question.selectedChoice
      })
      return pred.save()
    })

    yield Promise.all(predictions)
    yield this.fetchPredictions.perform()
  }
}
