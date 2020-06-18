import Service from "@ember/service";
import { inject as service } from "@ember/service";
import ENV from 'codingblocks-online/config/environment';
import Uploader from 'ember-uploader/uploaders/uploader';

export default class RunAttemptService extends Service {
  @service session;

  constructor() {
    super(...arguments);
    const jwt = this.get('session.data.authenticated.jwt')
    const uploader = Uploader.create({
      url: `${ENV.apiHost}/api/minio/upload`,
      ajaxSettings: {
        headers: {
          'Authorization': `JWT ${jwt}`
        }
      }
    })
    this.set('uploader', uploader)
  }

  upload(file) {
    this.uploader.upload(file)

    return new Promise((resolve, reject) => {
      this.uploader.on('didUpload', resolve)
    })
  }
}
