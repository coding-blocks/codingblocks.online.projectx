import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | attempt/content/course-recommend', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:attempt/content/course-recommend');
    assert.ok(controller);
  });
});
