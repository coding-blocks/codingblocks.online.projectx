import Component from '@ember/component';
import { computed } from 'ember-decorators/object';
import { task } from 'ember-concurrency';
import { service } from 'ember-decorators/service';
import env from 'codingblocks-online/config/environment';

export default class DukaanDropdown extends Component {
  @service api

  cartItem = null
  dukaanUrl = ""

  constructor() {
    super(...arguments)
    
    this.get('fetchCart').perform()
    this.set('dukaanUrl', env.dukaanUrl)
  }

  didInsertElement() {
    this.$('#cart-icon,#cart-box').on("click", e => {
      e.stopPropagation();
    })

    this.$('#cart-icon').on('click', e => {
      this.get('fetchCart').perform()
    })
  }

  @computed('activeTab')
  showDialog() {
    return this.get('activeTab') === 'cart'
    // return true
  }

  fetchCart = task(function *() {
    try {
      const cart = yield this.get('api').request('/runs/cart')
      this.set('cartItem', cart.cartItems[0])
    } catch (err) {
      this.set('cartIttems', null)
    }
  })

  clearCartTask = task(function *() {
    yield this.get('api').request('/runs/clear_cart')
    this.set('cartItem', false)
  })

}