import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class TracksFilter extends Component {
  @service store

  @action
  continue() {
    this.get('onSearch')()
  }

  @restartableTask fetchProfessionsTask = function *() {
    return yield this.store.findAll('profession')
  }
}
