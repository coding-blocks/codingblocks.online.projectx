import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class TracksFilter extends Component {
  @service store

  selectedStatus = 'student'

  @action
  continue() {
    this.sendAction('onSearch', {
      status: this.selectedStatus,
      professionId: this.selectedProfessionId
    })
  }

  @restartableTask fetchProfessionsTask = function *() {
    return yield this.store.findAll('profession')
  }
}
