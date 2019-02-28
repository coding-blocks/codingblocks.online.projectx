import Ember from 'ember';
import { task } from 'ember-concurrency';
import { service } from 'ember-decorators/service';
import { action } from 'ember-decorators/object'
import env from 'codingblocks-online/config/environment';

export default class extends Ember.Component {
  @service api

  dukaanUrl = env.dukaanUrl

  addCartTask = task(function *(){
    yield this.get('api').request('/runs/clear_cart');
    const runId = this.get('run.id');
    yield this.get('api').request(`/runs/${runId}/buy`);
    window.location.href = this.get('dukaanUrl')
  })
}
