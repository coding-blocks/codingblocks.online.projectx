import Component from '@ember/component'
import { alias } from 'ember-decorators/object/computed'
import { service } from 'ember-decorators/service'
import { action } from 'ember-decorators/object'
import { computed } from 'ember-decorators/object'
import config from 'codingblocks-online/config/environment'


export default class CodeChallengeComponent extends Component {
    @service api
    @service ajax
    @service hbApi
    @service currentUser
    @service pollboy
    @alias ('payload') code
    

    sourceCode = ''
    customInput = ''
    customOutput = ''
    runError = ''
    language = 'cpp'
    
    pollId = null
    maxPollCount = 10
    pollCount = 0

    @computed('sourceCode')
    sourceCodeBase64 () {
        return window.btoa(this.get('sourceCode'))
    }

    @computed('problemJsonApiPayload')
    problem () {
        const payload = this.get('problemJsonApiPayload')
        return payload.data.attributes
    }

    @computed('problemJsonApiPayload')
    codeStubs () {
        const payload = this.get('problemJsonApiPayload')
        const checkList = {
            java: true,
            cpp: true,
            c: true,
            py2: true,
            csharp: true,
            js: true
        }
        return payload.included.filter(stubs => {
            if (checkList[stubs.attributes.language]) {
                checkList[stubs.attributes.language] = false
                return true
            } else {
                return false
            }
        }).map(stub => stub.attributes)
    }

    @computed('customInput')
    customInputBase64 () {
        return window.btoa(this.get('customInput'))
    }

    didReceiveAttrs () {
        this._super(...arguments)
        const code = this.get('code')
        this.get('hbApi').request('problems', {
            data: {
                contest_id: code.get('hbContestId'),
                problem_id: code.get('hbProblemId')
            }
        }).then(result => {
            console.log(result)
            this.set('problemJsonApiPayload', result)
        }).catch(err => {
            console.log(err)
        })
    }

    @action
    runCode () {
        this.get('ajax').request('https://judge.cb.lk/api/submission', {
            method: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: {
                expected_output: [""],
                input: [this.get('customInputBase64')],
                source: this.get('sourceCodeBase64'),
                test_count: 1,
                lang: this.get('language'),
                test_count: 1,
                get_output: true,
                wait: true
            },
            headers: {
                'access-token': config.judgeApiKey 
            }
        }).then(({error, result, data}) => {
            if (result === 'success') {
                this.set('customOutput', window.atob(data.testcases[0].output))
            } else {
                this.set('runError', window.atob(error))
            }
        })
    }

    @action
    submitCode () {
        const code = this.get('code')
        this.get('hbApi').request('submissions', {
            method: 'POST',
            data: {
                contestId: code.get('hbContestId'),
                problemId: code.get('hbProblemId'),
                language: this.get('language'),
                source: this.get('sourceCodeBase64'),
            }
        }).then( ({submissionId}) => {
            const pollId = this.get('pollboy').add(this, function () {
                return this._pollForSubmissionResults(submissionId)
            }, 2000)
            this.set('pollId', pollId);
        })
    }

    _pollForSubmissionResults (submissionId) {
        return this.get('hbApi').request('submissions/result/' + submissionId, {
            xhrFields: {
                withCredentials: true
            }
        }).then( result => {
            if (result && result.data) {
                // we've got the results
                // set the results
                this.set('submissionResultsPayload', result)
                //stop polling
                this._stopPolling()
            } else {
                // check for pollCount
                const pollCount = this.get('pollCount')
                if (pollCount >= this.get('maxPollCount')) {
                    this.set('submissionResultsPayload', {
                        status: 'error',
                        error: 'Cannot connect to hackerblocks to get your results'
                    })
                    this._stopPolling()
                } else {
                    this.set('pollCount', +pollCount + 1);
                }
            }
        })
    }

    _stopPolling () {
        this.get('pollboy').remove(this.get('pollId'))
        this.set('pollCount', 0)
    }

    

}
