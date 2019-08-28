'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'codingblocks-online',
    podModulePrefix: 'codingblocks-online/pods',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
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
    metricsAdapters: [
      {
        name: 'FacebookPixel',
        environments: ['production'],
        config: {
          id: '1947467048859851'
        }
      }
    ],
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    vdoplayerTheme: '9ae8bbe8dd964ddc9bdb932cca1cb59a',
    fastboot: {
      hostWhitelist: ['codingblocks.com', 'online.codingblocks.com', /^localhost:\d+$/]
    }
  };

  ENV.dukaanUrl = 'https://dukaan.codingblocks.xyz'

  ENV['ember-toggle'] = {
    includedThemes: ['ios'],
    defaultTheme: 'ios',
    defaultSize: 'medium'
  }

  ENV.firebase = {
    apiKey: 'AIzaSyD1bGr7kMHEWxK0X-oIKWfsZ29QNhjJA5U',
    databaseURL: "https://cb-ide.firebaseio.com/",
    projectId: "cb-ide"
  }

  ENV.talkjs = {
    appId: 'tZFACp8h'
  }

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
    ENV.hackApiHost = 'https://hack-api.codingblocks.com'
    ENV.googleAnalytics = {
      webPropertyId: 'UA-83327907-12'
    }
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
    ENV.apiHost = 'https://online-api.codingblocks.com'
    ENV.publicUrl = 'https://online.codingblocks.com';
    ENV.clientId = 5633768694
    ENV.oneauthURL = 'https://account.codingblocks.com'
    ENV.hackApiHost = 'https://hack-api.codingblocks.com'
    ENV.googleAnalytics = {
      webPropertyId: 'UA-83327907-12'
    }
    ENV["ember-facebook-pixel"] = {
      id: '1947467048859851'
    };
    ENV.dukaanUrl = 'https://dukaan.codingblocks.com'
    ENV.firebase = {
      apiKey: 'AIzaSyBmhZWgSNL32DCYIouM_iPs4rbtq-NPugo',
      databaseURL: "https://cb-ide-79a73.firebaseio.com/",
      projectId: "cb-ide-79a73"
    }
    ENV.talkjs = {
      appId: '2LhQvB3j'
    }
  }

  if (environment === 'staging') {
    ENV.apiHost = 'https://api-online.codingblocks.xyz'
    ENV.publicUrl = 'https://online.codingblocks.xyz';
    ENV.clientId = 5169892443
    ENV.oneauthURL = 'https://account.codingblocks.com'
    ENV.hackApiHost = 'https://api.codingblocks.xyz'

    ENV.talkjs = {
      appId: '2LhQvB3j'
    }
  }

  if (process.env.oss) {
    ENV.clientId = 8225714181
    ENV.apiHost = 'https://api-online-public.codingblocks.xyz'
  }

  ENV['ember-simple-auth-token'].tokenPropertyName = 'jwt'
  ENV['ember-simple-auth-token'].serverTokenEndpoint = `${ENV.apiHost}/api/jwt/login/`
  ENV['ember-simple-auth-token'].serverTokenRefreshEndpoint = `${ENV.apiHost}/api/jwt/refresh/?client=web`

  return ENV;
};


// 341997496266637