import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';
import { later } from '@ember/runloop';

export default class LeaderboardComponent extends Component {
  @service store
  @service player
  @service hbApi

  @restartableTask fetchLeaderboardTask = function *() {
    const runAttempt = this.store.peekRecord('run-attempt', this.player.runAttemptId)
    yield this.hbApi.request('content-leaderboards', {
      data: {
        filter: {
          contestId: runAttempt.get("run.contestId"),
          contentId: this.codeChallenge.get("hbContentId")
        }
      }
    }).then(result => {
      this.store.unloadAll('content-leaderboard')
      later(() => {
        this.store.pushPayload(result)
        this.set('leaderboard', this.get('store').peekAll('content-leaderboard'))
      })
    })
  }
}
