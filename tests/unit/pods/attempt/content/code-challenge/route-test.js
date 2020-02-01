import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | attempt/content/code-challenge', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:attempt/content/code-challenge');
    assert.ok(route);
  });
});
