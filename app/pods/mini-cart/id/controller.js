import Ember from 'ember';
import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';
import { isNotFoundError } from 'ember-ajax/errors';
import env from "codingblocks-online/config/environment";

export default class extends Ember.Controller{
  @service store
  @service api

  constructor()  {
    super(...arguments)
    this.set('dukaanUrl', env.dukaanUrl)
  }

  @action
  async swapCart() {
    await this.get('api').request('/runs/clear_cart');
    const runId = this.get('run.id');
    await this.get('api').request(`/runs/${runId}/buy`);
    window.location.href = this.get('dukaanUrl')
  }

}
