import DS from "ember-data";
import { computed } from '@ember/object'
import { isValidResult, isPassedTestcase } from "codingblocks-online/utils/testcases";
import { pipe, not } from "codingblocks-online/utils/functional";

export default DS.Model.extend({
  language: DS.attr(),
  score: DS.attr(),
  'submit-at': DS.attr(),
  'judge-result': DS.attr(),

  isErrored: computed('judge-result', function () {
    return this.get('judge-result').result !== 'success'
  }),

  errorMessage: computed('judge-result', 'isErrored', function () {
    if (!this.get('isErrored')) {
      return ''
    }
    
    switch (this.get('judge-result').result) {
      case 'compile_error': return 'Compilation Error'
    }
  }),

  passedTestCasesArray: computed('judge-result', function () {
    const results = this.get('judge-result')
    if (!isValidResult(results)) {
      return []
    }
    const passedTestcases =  results.data.testcases.filter(isPassedTestcase)
    return passedTestcases;
  }),
  passedTestCases: computed('passedTestCasesArray', function () {
    const passedTestcases = this.get('passedTestCasesArray')
    return passedTestcases.length ? passedTestcases.map((tc, index) => index + 1).toString() : '[]'
  }),
  failedTestCasesArray: computed('judge-result', function () {
    const results = this.get('judge-result')
    if (!isValidResult(results))
      return []

    const failedTestCases =  results.data.testcases.filter(not(isPassedTestcase))
    return failedTestCases
  }),
  failedTestCases: computed('failedTestCasesArray', function () {
    const failedTestCases = this.get('failedTestCasesArray')
    return failedTestCases.length ? failedTestCases.map((tc, index) => index + 1).toString() : '[]' 
  }),
  user: DS.belongsTo('user')
})