import Ember from 'ember'
import { isNotFoundError } from 'ember-ajax/errors';
import { service } from 'ember-decorators/service';
import env from "codingblocks-online/config/environment";

export default class extends Ember.Route{
  @service api

  async model(params) {
    try {
      const cart = await this.get('api').request('/runs/cart')
      const run = await this.store.queryRecord("run", {
        custom: {
          ext: 'url',
          url: `/${params.runId}?exclude=courses.*`
        }
      }).catch(err => {
        if (isNotFoundError(err)) {
          this.transitionTo('/404')
        }
      })
      return Ember.RSVP.hash({
        run,
        cart
      })
    } catch (err) {
      debugger
      if (isNotFoundError(err)){
        this.get('api').request(`/runs/${params.runId}/buy`);
        window.location.href = env.dukaanUrl
      }
    }
  }

  async setupController(controller, model) {
    this._super(...arguments)
    controller.set('run', model.run)
    controller.set('dukaanCart', model.cart)
  }
}