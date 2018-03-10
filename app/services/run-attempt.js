import Service from '@ember/service'

export default class RunAttemptService extends Service {
    _runAttemptId = null

    setRunAttempt (runAttemptId) {
        this._runAttemptId = runAttemptId
    }

    getRunAttempt () {
        return this._runAttemptId
    }

}