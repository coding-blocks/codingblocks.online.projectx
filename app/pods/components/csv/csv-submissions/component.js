import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class CsvSubmissions extends Component {
  @service store
  @service player

  @restartableTask fetchSubmissionsTask = function *() {
    return yield this.store.query('csv-submission', {
      filter: {
        csvId: this.csv.get('id'),
        runAttemptId: this.player.runAttemptId
      },
      sort: '-createdAt'
    })
  }
}
