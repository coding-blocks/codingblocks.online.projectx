import Ember from 'ember';
import ENV from 'codingblocks-online/config/environment';
import FileField from 'ember-uploader/components/file-field';
import Uploader from 'ember-uploader/uploaders/uploader';

export default FileField.extend({
  uploader: null,
  files: null,
  session: Ember.inject.service(),
  didUpdateAttrs () {
    this._super(...arguments)
    const files = this.get('files'),
      uploader = this.get('uploader'),
      triggerUpload = this.get('triggerUpload')

    if (triggerUpload === true && !Ember.isEmpty(files) ) {
      uploader.upload(files[ 0 ], {
        'extra': 'data'
      })
    } else {
      this.get('onError')()
    }
  },
  filesDidChange (files) {
    const jwt = this.get('session.data.authenticated.jwt')
    const uploader = Uploader.create({
      url: `${ENV.apiHost}/api/minio/upload`,
      ajaxSettings: {
        headers: {
          'Authorization': `JWT ${jwt}`
        }
      }
    })

    if(this.get('onProgress')) {
      uploader.on('progress', e => {
        this.get('onProgress')(e)
      })
    }
    

    uploader.on('didUpload', e => {
      this.get('onComplete')(e)
    })

    uploader.on('didError', (jqXHR, textStatus, errorThrown) => {
      this.get('onError')(...arguments)
    });

    this.set('uploader', uploader)
    this.set('files', files)
  }
});
