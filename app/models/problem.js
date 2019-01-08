import DS from "ember-data";
import {computed} from '@ember/object';

export default DS.Model.extend({
  name: DS.attr(),
  content: DS.attr(),
  submissions: DS.hasMany('submission'),
  mostSuccessfullSubmission: computed('submissions', function(){
    const submissions = this.get('submissions');
    return submissions.reduce((acc, curr)=> acc.get("score")>= curr.get("score")? acc: curr, submissions.objectAt(0))
  }),
  "code-challenge": DS.belongsTo('code-challenge')
})