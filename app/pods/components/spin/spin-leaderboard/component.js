import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';

export default class SpinLeaderboard extends Component {
  @restartableTask fetchWinnersTask = function *() {
    // TODO: fetch top winners from /spins/winners
  }
}
