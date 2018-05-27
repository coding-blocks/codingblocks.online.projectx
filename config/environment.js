'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'codingblocks-online',
    podModulePrefix: 'codingblocks-online/pods',
    environment,
    rootURL: '/',
    locationType: 'auto',
    sentry: {
      dsn: 'https://4847af8c7e2d4de8b5eafcb01093ac68@sentry.cb.lk/20'
    },
    'ember-simple-auth-token': {
      identificationField: 'code',
      passwordField: 'code',
      tokenPropertyName: 'jwt',
      refreshAccessTokens: true,
      tokenExpireName: 'exp',
      refreshLeeway: 60, //send a request for refresh_token 60sec before actual expiration
      authorizationPrefix: 'JWT ',
    },
    hbBaseUrl: "https://hack.codingblocks.com",
    discussBaseUrl: 'https://discuss.codingblocks.com',
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
    ENV.hackApiHost = 'https://api.cb.lk'
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
    ENV.apiHost = 'https://api-online.cb.lk'
    ENV.publicUrl = 'https://online.codingblocks.com';
    ENV.clientId = 5633768694
    ENV.oneauthURL = 'https://account.codingblocks.com'
    ENV.hackApiHost = 'https://api.cb.lk'
    ENV.sentry.dsn = 'https://28a62ac6a0194a8381f4a6df014fa5ed@sentry.cb.lk/21'
    ENV.googleAnalytics = {
      webPropertyId: 'UA-83327907-9'
    }
  }

  if (environment === 'staging') {
    ENV.apiHost = 'https://codingblocks-online-v2-staging.herokuapp.com'
    ENV.publicUrl = 'https://online.codingblocks.xyz';
    ENV.clientId = 5169892443
    ENV.oneauthURL = 'https://account.codingblocks.com'
    ENV.hackApiHost = 'https://api.codingblocks.xyz'
    ENV.sentry.dsn = 'https://a1e58068dc5c48edb9b313b1efbe22ec@sentry.cb.lk/19'
  }

  ENV['ember-simple-auth-token'].tokenPropertyName = 'jwt'
  ENV['ember-simple-auth-token'].serverTokenEndpoint = `${ENV.apiHost}/api/jwt/login/`
  ENV['ember-simple-auth-token'].serverTokenRefreshEndpoint = `${ENV.apiHost}/api/jwt/refresh/`

  return ENV;
};
