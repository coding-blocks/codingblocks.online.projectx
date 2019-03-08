import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember-decorators/service';
import env from 'codingblocks-online/config/environment';

export default class CartDialog extends Component {
  @service api

  dukaanUrl = env.dukaanUrl

  @restartableTask
  *addCartTask() {
    yield this.get('api').request('/runs/clear_cart');
    const runId = this.get('run.id');
    yield this.get('api').request(`/runs/${runId}/buy`);
    window.location.href = this.get('dukaanUrl')
  }
}
