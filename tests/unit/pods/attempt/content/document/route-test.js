import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | attempt/content/document', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:attempt/content/document');
    assert.ok(route);
  });
});
