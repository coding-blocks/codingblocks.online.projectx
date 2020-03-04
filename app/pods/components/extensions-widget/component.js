import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import env from "codingblocks-online/config/environment";

export default class ExtensionsWidgetComponent extends Component {
  @service api
  @service currentUser

  @restartableTask extensionsTask = function* ()  {
    const product = yield this.api.request('/runs/products/' + this.run.get('productId'))
    
    return product.product_extensions
      .map(ext => ({
        id: ext.id,
        name: ext.name,
        expiry: moment.unix(this.run.get('end')).add(ext.duration, "days").format("DD MMM YYYY"),
        price: Math.ceil(ext.mrp/100)
      }))
      .sortBy('price')
  }

  @restartableTask buyExtensionTask = function *() {
    const extension = this.selectedExtension
    yield this.api.request(`/runs/extensions/${extension.id}/buy`, {
      method: 'POST'
    })

    window.location.href = env.dukaanUrl
  }

  @computed('env.dukaanUrl', 'selectedExtension', 'currentUser.user')
  get buyExtensionUrl () {
    const { id: productId } = this.selectedExtension
    const { user } = this.currentUser
    return `${env.dukaanUrl}/buy?productId=${productId}&oneauthId=${user.oneauthId}`
  }
}
