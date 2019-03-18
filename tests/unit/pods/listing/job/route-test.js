import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | listing/job', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:listing/job');
    assert.ok(route);
  });
});
