import Component from '@ember/component';
import { inject as service } from '@ember-decorators/service';
import { restartableTask } from 'ember-concurrency-decorators';

export default class PlayerCsvLeaderboardComponent extends Component {

  @service api;

  didReceiveAttrs() {
    this.fetchLeaderboardTask.perform();
  }

  @restartableTask
  *fetchLeaderboardTask() {
    let csvId = this.get('csvId');
    this.api.request(`/csvs/${csvId}/leaderboard`, {
      method: 'GET'
    }).then(response => {
      this.set('lb', response);
    });
  }

}
