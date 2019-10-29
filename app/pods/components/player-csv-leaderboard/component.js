import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';
// eslint-disable-next-line no-undef
const moment = require('moment');

export default class PlayerCsvLeaderboardComponent extends Component {
  @service api;

  isVisible = false;

  didReceiveAttrs() {
    this._super(...arguments);
    this.fetchLeaderboardTask.perform();
  }

  /**
   * Fetches the leaderboard data for the
   * CSV submission and humanizes the timestamp
   */

  @restartableTask fetchLeaderboardTask = function*() {
    let csvId = this.get('csvId');

    // Fetch the leaderboard data from the server
    let response = yield this.api.request(`/csvs/${csvId}/leaderboard`, {
      method: 'GET',
    });

    response = response.map(row => {
      row.firstname = row.firstname ? row.firstname.capitalize() : '';
      row.lastname = row.lastname ? row.lastname.capitalize() : '';
      row.createdAt = moment(row.createdAt).fromNow();
      return row;
    });

    this.set('lb', response);

    if (response.length > 0) {
      this.set('isVisible', true);
    }
  };
}
