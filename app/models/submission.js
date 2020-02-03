import DS from "ember-data";
import { computed } from '@ember/object'
import { isValidResult, isPassedTestcase } from "codingblocks-online/utils/testcases";
import { pipe, not } from "codingblocks-online/utils/functional";

export default DS.Model.extend({
  language: DS.attr(),
  score: DS.attr(),
  source: DS.attr(),
  explanation: DS.attr(),
  'submit-at': DS.attr(),
  'judge-result': DS.attr(),

  sourceParsed: computed('source', function () {
    return window.atob(this.source)
  }),

  isErrored: computed('judge-result', function () {
    return this['judge-result'].result !== 'success';
  }),

  errorMessage: computed('judge-result', 'isErrored', function () {
    if (!this.isErrored) {
      return ''
    }
    
    switch (this['judge-result'].result) {
      case 'compile_error': return 'Compilation Error'
    }
  }),

  passedTestCasesArray: computed('judge-result', function () {
    const results = this['judge-result']
    if (!isValidResult(results)) {
      return []
    }
    const passedTestcases =  results.data.testcases.filter(isPassedTestcase)
    return passedTestcases;
  }),
  passedTestCases: computed('passedTestCasesArray', function () {
    const passedTestcases = this.passedTestCasesArray
    return passedTestcases.length ? passedTestcases.map((tc, index) => index + 1).toString() : '[]'
  }),
  failedTestCasesArray: computed('judge-result', function () {
    const results = this['judge-result']
    if (!isValidResult(results))
      return []

    const failedTestCases =  results.data.testcases.filter(not(isPassedTestcase))
    return failedTestCases
  }),
  failedTestCases: computed('failedTestCasesArray', function () {
    const failedTestCases = this.failedTestCasesArray
    return failedTestCases.length ? failedTestCases.map((tc, index) => index + 1).toString() : '[]' 
  }),
  executionTime: Ember.computed('judge-result', function () {
    const testcases = this.get('judge-result.data.testcases')
    if (!testcases) 
      return '--'
    
    return testcases.reduce((acc, t) => acc + +t.runtime, 0).toFixed(2)
  }),
  resultParams: Ember.computed('explanation', 'submissionType', function() {
    switch(this.explanation) {
      case 'Perfect': return {
        color: 'green',
        icon: 'check',
        message: 'Accepted'
      }
      case 'FailedTestcase': return {
        color: 'red',
        icon: 'times',
        message: 'Wrong Answer'
      }
      case 'TimeLimitExceeded': return {
        color: 'orange',
        icon: 'exclamation',
        message: 'TLE'
      }
      case 'CompilationError': return {
        color: 'orange',
        icon: 'exclamation',
        message: 'Compilation Error'
      }
      case 'ContestOver': return {
        color: 'orange',
        icon: 'exclamation',
        message: 'Contest Over'
      }
      case 'TestcaseUnlocked': return {
        color: 'orange',
        icon: 'exclamation',
        message: 'Test Case Unlocked'
      }
      case 'EditorialUnlocked': return {
        color: 'orange',
        icon: 'exclamation',
        message: 'Editorial Unlocked'
      }
      default: return {
        color: 'orange',
        icon: 'exclamation',
        message: 'Submission Not Judged'
      }
    }
  }),
  user: DS.belongsTo('user')
})