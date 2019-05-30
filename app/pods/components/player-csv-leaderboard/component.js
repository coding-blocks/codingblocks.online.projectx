import Component from '@ember/component';
import { inject as service } from '@ember-decorators/service';
import { restartableTask } from 'ember-concurrency-decorators';
const moment = require('moment');

export default class PlayerCsvLeaderboardComponent extends Component {

  @service api;

  didReceiveAttrs() {
    this.fetchLeaderboardTask.perform();
  }

  /**
   * Fetches the leaderboard data for the 
   * CSV submission and humanizes the timestamp
   */

  @restartableTask
  *fetchLeaderboardTask() {
    let csvId = this.get('csvId');

    // Fetch the leaderboard data from the server
    let response = yield this.api.request(`/csvs/${csvId}/leaderboard`, {
      method: 'GET'
    })
    response = response.map(row => {
      row.firstname = row.firstname ? row.firstname.capitalize() : ''
      row.lastname = row.lastname ? row.lastname.capitalize() : ''
      row.createdAt = moment.duration(moment(row.createdAt).diff(moment.now())).humanize() + " ago"
      return row 
    })
    this.set('lb', response);
  }

}
