import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import env from 'codingblocks-online/config/environment';

export default class ExtensionsWidgetComponent extends Component {
  @service api;

  isVisible = false;

  @restartableTask extensionsTask = function*() {
    const product = yield this.api.request('/runs/products/' + this.run.get('productId'));

    this.set('isVisible', !!product.product_extensions.length);
    return product.product_extensions.map(ext => ({
      id: ext.id,
      name: ext.name,
      // eslint-disable-next-line no-undef
      expiry: moment
        .unix(this.run.get('end'))
        .add(ext.duration, 'days')
        .format('DD MMM YYYY'),
      price: Math.ceil(ext.mrp / 100),
    }));
  };

  @restartableTask buyExtensionTask = function*() {
    const extension = this.selectedExtension;
    yield this.api.request(`/runs/extensions/${extension.id}/buy`, {
      method: 'POST',
    });

    window.location.href = env.dukaanUrl;
  };

  didReceiveAttrs() {
    this._super(...arguments);
    this.extensionsTask.perform();
  }
}
