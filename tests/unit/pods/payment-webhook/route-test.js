import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | payment_webhook', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:payment-webhook');
    assert.ok(route);
  });
});
