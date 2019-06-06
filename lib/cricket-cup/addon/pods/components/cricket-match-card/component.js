import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service'
import { dropTask } from 'ember-concurrency-decorators'
import DS from 'ember-data'
import moment from 'moment';

export default class CricketMatchCardComponent extends Component {
  @service store

  @computed ('match')
  get predictions () {
    return DS.PromiseObject.create({
      promise: this.store.query('cricketCupUserPrediction', {
        filter: {
          cricketCupMatchId: this.match.id
        }
      })
    })
  }

  @computed('match.predictionEnd')
  get predictionEndTime() {
    return moment(this.match.predictionEnd)
  }

  @computed('match.predictionEnd')
  get hasPredictionEnded() {
    return moment() > this.predictionEndTime
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
    this.set('match', this.match)
  }
}
