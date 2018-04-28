import Component from '@ember/component'
import { alias } from 'ember-decorators/object/computed'
import { service } from 'ember-decorators/service'
import { action } from 'ember-decorators/object'
import { computed } from 'ember-decorators/object'
import { task, timeout } from 'ember-concurrency'
import config from 'codingblocks-online/config/environment'


export default class CodeChallengeComponent extends Component {
    @service api
    @service ajax
    @service hbApi
    @service currentUser
    @alias ('payload') code
    
    sourceCode = ''
    customInput = ''
    customOutput = ''
    runError = ''
    language = 'cpp'
    classNames = ['height-100']

    maxPollCount = 20
    
    @computed('sourceCode')
    sourceCodeBase64 () {
        return window.btoa(this.get('sourceCode'))
    }

    @computed('problemJsonApiPayload')
    problem () {
        const payload = this.get('problemJsonApiPayload')
        return payload ? payload.data.attributes : {}
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

    runCodeTask = task(function * (config) {
        return yield this.get('ajax').request('https://judge.cb.lk/api/submission', {
            method: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: {
                expected_output: [""],
                input: [config.input],
                source: config.source,
                test_count: 1,
                lang: config.lang,
                test_count: 1,
                get_output: true,
                wait: true
            },
            headers: {
                'access-token': config.judgeApiKey 
            }
        })
        // .then(({error, result, data}) => {
        //     if (result === 'success') {
        //         this.set('customOutput', window.atob(data.testcases[0].output))
        //     } else {
        //         this.set('runError', window.atob(error))
        //     }
        // })
    })

    submitCodeTask = task(function *  (config) {
        const code = this.get('code')
        const { submissionId } = yield this.get('hbApi').request('submissions', {
            method: 'POST',
            data: {
                contestId: code.get('hbContestId'),
                problemId: code.get('hbProblemId'),
                language: config.lang,
                source: config.source,
            }
        })
        for (let i = 0; i < this.get('maxPollCount') ; i++) {
          const result = yield this.get('hbApi').request('submissions/result/' + submissionId, {
            xhrFields: {
                withCredentials: true
            }
          })
          if (result && result.data) {
            return result
          }
          yield timeout(3000)
        }
        return ({err: 'Cannot Connect to HB'}) 
    }) 

}
