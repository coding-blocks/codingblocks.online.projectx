import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class CsvLeaderboard extends Component {
  @service api

  @restartableTask fetchLeaderboardTask = function *() {
    const csvId = this.csv.get('id');

    // Fetch the leaderboard data from the server
    return (yield this.api.request(`/csvs/${csvId}/leaderboard`, {
      method: 'GET'
    })).map(row => {
      row.firstname = row.firstname ? row.firstname.capitalize() : '';
      row.lastname = row.lastname ? row.lastname.capitalize() : '';
      row.createdAt = moment(row.createdAt).fromNow();
      return row;
    })
  }
}
