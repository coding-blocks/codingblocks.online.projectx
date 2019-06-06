import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service'
import moment from 'moment';

export default class CricketMatchCardComponent extends Component {
  @service store

  predictions = []

  async didReceiveAttrs() {
    const predictions = await this.store.query('cricketCupUserPrediction', {
      filter: {
        cricketCupMatchId: this.match.id
      }
    })
    if (predictions.length) {
      this.set('predictions', predictions)
    } else {
      this.set('predictions', this.match.cricketCupQuestions.map(question =>
        this.store.createRecord('cricketCupUserPrediction', {
          cricketCupQuestion: question,
          cricketCupMatch: question.cricketCupMatch
        })
      ))
    }
  }

  @computed('match.predictionEnd')
  get predictionEndTime() {
    return moment(this.match.predictionEnd)
  }

  @computed('match.predictionEnd')
  get hasPredictionEnded() {
    return moment() > this.predictionEndTime
  }
}
