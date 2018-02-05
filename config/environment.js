'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'codingblocks-online',
    podModulePrefix: 'codingblocks-online/pods',
    environment,
    rootURL: '/',
    locationType: 'auto',
    sentry: {
      dsn: 'http://d77f60ee852e4daeafe0edd20c294269@sentry.cb.lk/13'
    },
    'ember-simple-auth-token': {
      identificationField: 'code',
      passwordField: 'code',
      tokenPropertyName: 'jwt',
      refreshAccessTokens: true,
      tokenExpireName: 'exp',
      refreshLeeway: 60, //send a request for refresh_token 60sec before actual expiration
      authorizationPrefix: 'JWT '
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.apiHost = 'http://localhost:3000'
    ENV.publicUrl = 'http://localhost:4200';
    ENV.clientId = 7642172843
    ENV.oneauthURL = 'https://account.codingblocks.com'
    ENV['ember-simple-auth-token'].tokenPropertyName = 'jwt'
    ENV['ember-simple-auth-token'].serverTokenEndpoint = `${ENV.apiHost}/api/jwt/login/`
    ENV['ember-simple-auth-token'].serverTokenRefreshEndpoint = `${ENV.apiHost}/api/jwt/refresh/`
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
    /*ENV.publicUrl = 'https://online.codingblocks.com';
    ENV.apiEndpoint = 'https://api-online.cb.lk';
    ENV.clientId = 5633768694
    ENV.oneauthURL = 'https://account.codingblocks.com/'*/
  }

  if (environment === 'staging') {
    /*ENV.publicUrl = 'https://staging.codingblocks.online';
    ENV.apiEndpoint = 'https://codingblocks-online-staging.herokuapp.com';
    ENV.clientId = 5633768694
    ENV.oneauthURL = 'https://account.codingblocks.com/'*/
  }

  return ENV;
};
