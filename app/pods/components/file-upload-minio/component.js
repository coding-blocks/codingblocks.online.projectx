import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import ENV from 'codingblocks-online/config/environment';
import FileField from 'ember-uploader/components/file-field';
import Uploader from 'ember-uploader/uploaders/uploader';

export default FileField.extend({
  uploader: null,
  files: null,
  session: service(),
  didUpdateAttrs () {
    this._super(...arguments)
    const files = this.files,
      uploader = this.uploader,
      triggerUpload = this.triggerUpload

    if (triggerUpload === true && !isEmpty(files) ) {
      uploader.upload(files[ 0 ], {
        'extra': 'data'
      })
    } else {
      this.onError()
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

    if(this.onProgress) {
      uploader.on('progress', e => {
        this.onProgress(e)
      })
    }
    

    uploader.on('didUpload', e => {
      this.onComplete(e)
    })

    uploader.on('didError', (jqXHR, textStatus, errorThrown) => {
      this.onError(...arguments)
    });

    this.set('uploader', uploader)
    this.set('files', files)
  }
});
