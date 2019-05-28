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
    this.api.request(`/csvs/${csvId}/leaderboard`, {
      method: 'GET'
    }).then(response => {
      // Humanize the 'createdAt' time
      for (let i = 0; i < response.length; i++) {
        response[i].firstname = response[i].firstname.charAt(0).toUpperCase() + response[i].firstname.slice(1).toLowerCase();
        response[i].lastname = response[i].lastname.charAt(0).toUpperCase() + response[i].lastname.slice(1).toLowerCase();
        response[i].name = response[i].firstname + " " + response[i].lastname;
        response[i].createdAt = moment.duration(moment(response[i].createdAt).diff(moment.now())).humanize() + " ago";
      }
      this.set('lb', response);
    });
  }

}
