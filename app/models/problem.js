import DS from "ember-data";
import { computed } from '@ember/object';

export default DS.Model.extend({
  name: DS.attr(),
  details: DS.attr(),
  submissions: DS.hasMany('submission'),
  solutionStubs: DS.hasMany('solution-stub'),
  mostSuccessfullSubmission: computed('submissions', function(){
    const submissions = this.submissions;
    return submissions.reduce((acc, curr)=> acc.get("score")>= curr.get("score")? acc: curr, submissions.objectAt(0))
  }),
  hasLatestSubmissionPassed: computed('submissions', function(){
    const topSubmission = this.submissions.reduce((acc, val) => acc = acc.get('submit-at') > val.get('submit-at') ? acc: val, this.submissions.objectAt(0))
    
    if(topSubmission.get('isErrored')){
      return false
    }else{
      const failedTestCaseCount = topSubmission.get('judge-result.data.testcases').reduce((acc, val)=> acc = val.result !== 'correct'? ++acc: acc, 0)
      return !failedTestCaseCount
    }
  }),
  "code-challenge": DS.belongsTo('code-challenge')
})