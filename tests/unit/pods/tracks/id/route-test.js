import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | tracks/id', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:tracks/id');
    assert.ok(route);
  });
});
