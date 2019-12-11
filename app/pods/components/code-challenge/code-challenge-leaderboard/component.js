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
    yield this.hbApi.request('submissions/leaderboard', {
      data: {
        contest_id: runAttempt.get("run.contestId"),
        problem_id: this.codeChallenge.get("hbProblemId")
      }
    }).then(result => {
      this.store.unloadAll('problem-leaderboard')
      later(() => {
        this.store.pushPayload(result)
        this.set('leaderboard', this.get('store').peekAll('problem-leaderboard'))
      })
    })
  }
}
