import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | attempt/content/quiz/attempt/index', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:attempt/content/quiz/attempt/index');
    assert.ok(controller);
  });
});
