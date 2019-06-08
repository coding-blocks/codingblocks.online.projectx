import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { dropTask, restartableTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import moment from 'moment';

export default class CricketMatchCardComponent extends Component {
  @service store
  @service api
  @service session
  @service parentRouter

  predictions = []
  
  didReceiveAttrs() {
    this._super(...arguments);
    this.fetchPredictions.perform()
    this.fetchScore.perform()
  }

  @computed('predictions')
  get hasUserPredicted () {
    return this.predictions.length
  }
    
  @computed('match.predictionEnd')
  get predictionEndTime() {
    return moment(this.match.predictionEnd)
  }

  @computed('match.predictionEnd')
  get hasPredictionEnded() {
    return moment() > this.predictionEndTime
  }

  @restartableTask fetchScore = function *() {
    while (true) {
      const { score } = yield this.api.request(`/cricket_cup/matches/${this.match.id}/score`)
      this.set('team1score', score.batting.id === this.match.team1.id ? score.batting.score : score.bowling ? score.bowling.score : 'DNB')
      this.set('team2score', score.batting.id === this.match.team2.id ? score.batting.score : score.bowling ? score.bowling.score : 'DNB')
      yield timeout(120000)
    }
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
    if(!this.session.isAuthenticated){
      localStorage.setItem('redirectionPath', this.get('parentRouter.currentURL'))
      this.parentRouter.transitionTo('login')
    }
    const predictions = this.match.cricketCupQuestions.filter(question => question.selectedChoice).map(question =>  {
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
