import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | attempt/content/csv', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:attempt/content/csv');
    assert.ok(controller);
  });
});
