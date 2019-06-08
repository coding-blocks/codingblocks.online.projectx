import Component from '@ember/component';
import { computed } from '@ember/object';

export default class ResultViewComponent extends Component {
  @computed('predictions')
  get earnings() {
    return this.predictions.reduce((acc, prediction) => 
      acc + (prediction.cricketCupQuestion.get('correctChoiceId') === prediction.cricketCupChoice.get('id')
        ? prediction.cricketCupQuestion.get('score')
        : 0)
    , 0)
  }
}
