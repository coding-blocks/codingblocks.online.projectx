import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | attempt/content/lecture', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:attempt/content/lecture');
    assert.ok(route);
  });
});
