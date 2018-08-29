import ApplicationAdapter from './application'

export default ApplicationAdapter.extend({
    urlForFindRecord (id, modelName, snapshot) {
        let baseUrl = this.buildURL(modelName, id, snapshot)
        return `${baseUrl}/?include=contents&exclude=contents.*`
    }
})