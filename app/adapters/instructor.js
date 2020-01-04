import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  urlForQuery(query) {
    if (query.custom && query.custom.noResourceName) {
      const url = query.custom.url
      const prefix = this.urlPrefix()
      delete query.custom
      return `${prefix}/${url}`
    }
    return this._super(...arguments);
  }
});
