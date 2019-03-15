import Component from '@ember/component';
import { equal } from '@ember-decorators/object/computed';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember-decorators/service';
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

  @equal('activeTab', 'cart') showDialog

  @restartableTask
  *fetchCart (){
    try {
      const cart = yield this.get('api').request('/runs/cart')
      const item = cart.cartItems[0]
      item.list_price = (item.list_price / 100).toFixed(2)
      item.final_price = (item.final_price / 100).toFixed(2)
      item.amount = (item.amount / 100).toFixed(2)
      this.set('cartItem', item)
    } catch (err) {
      this.set('cartItem', null)
    }
  }

  @restartableTask
  *clearCartTask() {
    yield this.get('api').request('/runs/clear_cart')
    this.set('cartItem', false)
  }

}
