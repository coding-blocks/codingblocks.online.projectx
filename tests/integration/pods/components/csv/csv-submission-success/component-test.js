import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | csv/csv-submission-success', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Csv::CsvSubmissionSuccess />`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <Csv::CsvSubmissionSuccess>
        template block text
      </Csv::CsvSubmissionSuccess>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
