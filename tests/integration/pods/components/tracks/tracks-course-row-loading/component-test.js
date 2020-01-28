import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | tracks/tracks-course-row-loading', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Tracks::TracksCourseRowLoading />`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <Tracks::TracksCourseRowLoading>
        template block text
      </Tracks::TracksCourseRowLoading>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
