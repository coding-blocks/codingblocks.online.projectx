import DS from 'ember-data';
import { computed } from '@ember/object';
import { isValidResult, isPassedTestcase } from 'codingblocks-online/utils/testcases';
import { not } from 'codingblocks-online/utils/functional';

export default DS.Model.extend({
  language: DS.attr(),
  score: DS.attr(),
  source: DS.attr(),
  explanation: DS.attr(),
  'submit-at': DS.attr(),
  'judge-result': DS.attr(),

  isErrored: computed('judge-result', function() {
    return this['judge-result'].result !== 'success';
  }),

  errorMessage: computed('judge-result', 'isErrored', function() {
    if (!this.isErrored) {
      return '';
    }

    switch (this['judge-result'].result) {
      case 'compile_error':
        return 'Compilation Error';
    }
  }),

  passedTestCasesArray: computed('judge-result', function() {
    const results = this['judge-result'];
    if (!isValidResult(results)) {
      return [];
    }
    const passedTestcases = results.data.testcases.filter(isPassedTestcase);
    return passedTestcases;
  }),
  passedTestCases: computed('passedTestCasesArray', function() {
    const passedTestcases = this.passedTestCasesArray;
    return passedTestcases.length ? passedTestcases.map((tc, index) => index + 1).toString() : '[]';
  }),
  failedTestCasesArray: computed('judge-result', function() {
    const results = this['judge-result'];
    if (!isValidResult(results)) return [];

    const failedTestCases = results.data.testcases.filter(not(isPassedTestcase));
    return failedTestCases;
  }),
  failedTestCases: computed('failedTestCasesArray', function() {
    const failedTestCases = this.failedTestCasesArray;
    return failedTestCases.length ? failedTestCases.map((tc, index) => index + 1).toString() : '[]';
  }),
  user: DS.belongsTo('user'),
});
