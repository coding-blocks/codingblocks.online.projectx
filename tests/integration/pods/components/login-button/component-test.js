import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('login-button', 'Integration | Component | login button', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{login-button}}`);

  let loginButton = document.getElementsByClassName('button-solid')[0]
  assert.equal(loginButton, null);
  
  // Template block usage:
  this.render(hbs`
    {{#login-button}}
      template block text
    {{/login-button}}
  `);

  loginButton = document.getElementsByClassName('button-solid')[0]
  assert.equal(loginButton.innerText.trim(), 'template block text');
});
