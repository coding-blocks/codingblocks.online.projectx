import Mixin from '@ember/object/mixin';
import fetch from 'fetch';

export default Mixin.create({
  contentType: 'application/json; charset=utf-8',
  host: undefined,
  namespace: '/',
  request(url, options = {}) {
    let uri = `${this.host}${this.namespace}${url.startsWith('/') ? url : '/' + url}`
    const method = options.method || 'GET'

    if (method == 'GET' && options.data) {
      const data = options.data
      uri += '?'
      Object.keys(data).forEach(key => {
        uri += (key + '=' + encodeURIComponent(data[key]))
        uri += '&'
      })
      delete options.data
    }

    return fetch(uri, {
      method,
      body: options.data && JSON.stringify(options.data),
      headers: this.headers
    }).then(r => {
      if (r.ok)
        return r.json()

      throw r
    })
  }
})