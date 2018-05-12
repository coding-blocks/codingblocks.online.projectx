import DS from "ember-data";
import { computed } from '@ember/object'

export default DS.Model.extend({
  language: DS.attr(),
  score: DS.attr(),
  'submit-at': DS.attr(),
  'judge-result': DS.attr(),

  passedTestCasesArray: computed('judge-result', function () {
    const results = this.get('judge-result')
    const passedTestcases =  results.data.testcases.filter(tc => tc.result === 'success')
    return passedTestcases;
  }),
  passedTestCases: computed('passedTestCasesArray', function () {
    const passedTestcases = this.get('passedTestCasesArray')
    return passedTestcases.length ? passedTestcases.map((tc, index) => index + 1).toString() : '[]'
  }),
  failedTestCasesArray: computed('judge-result', function () {
    const results = this.get('judge-result')
    const failedTestCases =  results.data.testcases.filter(tc => tc.result !== 'success')
    return failedTestCases
  }),
  failedTestCases: computed('failedTestCasesArray', function () {
    const failedTestCases = this.get('failedTestCasesArray')
    return failedTestCases.length ? failedTestCases.map((tc, index) => index + 1).toString() : '[]' 
  }),
  user: DS.belongsTo('user')
})