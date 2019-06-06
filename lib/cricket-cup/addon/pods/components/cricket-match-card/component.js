import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

export default class CricketMatchCardComponent extends Component{
  @computed('match.predictionEnd')
  get predictionEndTime() {
    return moment(this.match.predictionEnd)
  }
}
