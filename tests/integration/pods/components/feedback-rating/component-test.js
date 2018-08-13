import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | feedback-rating', function(hooks) {
  setupRenderingTest(hooks);
  
  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    
    await render(hbs`{{feedback-rating}}`);
    assert.equal(this.element.textContent.trim(), '');
    
    // Template block usage:
    await render(hbs`
      {{#feedback-rating}}
        template block text
      {{/feedback-rating}}
    `);
    
    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});