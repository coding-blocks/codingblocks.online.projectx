import Service from '@ember/service'

export default class CurrentContentService extends Service {
    _contentId = null

    setContentId (contentId) {
        this._contentId = contentId
    }

    getContentId () {
        return this._contentId
    }
}