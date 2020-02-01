import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | job-listing-panels/eligible-jobs', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<JobListingPanels::EligibleJobs />`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <JobListingPanels::EligibleJobs>
        template block text
      </JobListingPanels::EligibleJobs>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
