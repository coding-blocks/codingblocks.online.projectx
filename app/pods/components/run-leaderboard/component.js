import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  api: service(),

  limit: 20,

  displayedLeaderboard: computed('leaderboard', 'limit', function() {
    return this.leaderboard.slice(0, this.limit);
  }),
  // don't show leaderboard if we are fetching the leaderboard or the request errored
  showLeaderboard: computed('getLeaderBoardTask.isRunning', 'isErrored', function() {
    if (this.get('getLeaderBoardTask.isRunning') || this.isErrored) {
      return false;
    }
    return true;
  }),
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('isErrored', false);
    this.getLeaderBoardTask.perform();
  },
  getLeaderBoardTask: task(function*() {
    const runId = this.get('run.id');
    const leaderboard = yield this.api.request(`/runs/${runId}/leaderboard`).catch(() => {
      this.set('isErrored', true);
    });
    this.set('leaderboard', leaderboard);
  }).restartable(),
  actions: {
    loadMore() {
      this.incrementProperty('limit', 30);
    },
  },
});
