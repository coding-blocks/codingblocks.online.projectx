import Engine from 'ember-engines/engine';
import loadInitializers from 'ember-load-initializers';
import Resolver from './resolver';
import config from './config/environment';

const { modulePrefix, podModulePrefix } = config;

const Eng = Engine.extend({
  modulePrefix,
  podModulePrefix,
  Resolver,
  dependencies: {
    services: [
      'store',
      'session',
      'api',
      'current-user',
      'parent-router'
    ],
    externalRoutes: [
      'login'
    ]
  }
});

loadInitializers(Eng, modulePrefix);

export default Eng;
