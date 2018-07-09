import RavenLogger from 'ember-cli-sentry/services/raven';
import config from 'codingblocks-online/config/environment';

export default RavenLogger.extend({

  unhandledPromiseErrorMessage: '',

  captureException(/* error */) {
    if (config.environment == 'development') {
      console.error(...arguments);
    }
    this._super(...arguments);
  },

  captureMessage(/* message */) {
    return this._super(...arguments);
  },

  enableGlobalErrorCatching() {
    return this._super(...arguments);
  },

  ignoreError() {
    return this._super();
  },

  callRaven(/* methodName, ...optional */) {
    return this._super(...arguments);
  }
});
