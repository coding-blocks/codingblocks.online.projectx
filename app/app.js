import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import './models/custom-inflector-rules';


const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver,
  engines: {
    hiringBlocks: {
      dependencies: {
        services: [
          'store',
          'session',
          'api',
          'current-user',
          { 'parent-router': 'router' }
        ],
        externalRoutes: {
          login: 'login',
          course: 'courses.id'
        }
      }
    },
    cricketCup: {
      dependencies: {
        services: [
          'store',
          'session',
          'api',
          'current-user',
          { 'parent-router': 'router' }
        ],
        externalRoutes: {
          login: 'login',
        }
      }
    }
  }
});

loadInitializers(App, config.modulePrefix);

export default App;
