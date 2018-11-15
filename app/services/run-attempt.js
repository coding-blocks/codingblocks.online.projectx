import Service from '@ember/service'

export default class RunAttemptService extends Service {

    //current run attempt
    runAttemptId = null

    //current section
    sectionId = null

    setRunAttempt (runAttemptId) {
        this.set('runAttemptId', runAttemptId)
    }

    setCurrentSection (sectionId) {
        this.set('sectionId', sectionId)
    }

    getRunAttempt () {
        return this.get('runAttemptId')
    }

}