'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'ember-cli-babel': {
      includeExternalHelpers: true
    },
    babel: {
      plugins: [ require.resolve('ember-auto-import/babel-plugin') ]
    },
    hinting: false, // disabled lint warnings
    // Add options here
    'ember-composable-helpers': {
      only: ['range', 'pipe', 'inc', 'repeat'],
    },
    sourcemaps: {
      enabled: true,
      extensions: ['js']
    },
    ace: {
      themes: ['ambiance', 'chaos', 'monokai', 'solarized_dark'],
      modes: ['javascript', 'c_cpp', 'python', 'java'],
      workers: ['javascript'],
      exts: ['language_tools']
    },
    'ember-cli-uglify': {
      /* https://github.com/mike-north/ember-monaco/issues/54 */
      exclude: EmberApp.env() == 'production' ? ['ember-monaco/**', 'firepad/**'] : []
    },
    tests: false
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  app.import('node_modules/@coding-blocks/motley/dist/online-cb/app.css')
  app.import('node_modules/showdown-katex-studdown/dist/showdown-katex.js')
  app.import('node_modules/jquery-resizable-dom/dist/jquery-resizable.min.js')

  return app.toTree();
};
