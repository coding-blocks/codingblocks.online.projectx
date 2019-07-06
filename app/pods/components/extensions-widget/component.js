import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { alias }  from '@ember/object/computed';

export default class ExtensionsWidgetComponent extends Component {

  @service api

  isVisible = false

  @restartableTask extensionsTask = function* ()  {
    const product = yield this.api.request('/runs/products/' + this.run.get('productId'))
    
    this.set('isVisible', true)
    return product.product_extensions.map(ext => ({
      id: ext.id,
      name: ext.name,
      expiry: moment.unix(this.run.get('end')).add(ext.duration, "days").format("DD MMM YYYY"),
      price: Math.ceil(ext.mrp/1000)
    }))
  }

  didReceiveAttrs() {
    this._super(...arguments)
    this.extensionsTask.perform()
  }
}
