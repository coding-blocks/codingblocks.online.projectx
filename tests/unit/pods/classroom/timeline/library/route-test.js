import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | classroom/timeline/library', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:classroom/timeline/library');
    assert.ok(route);
  });
});
