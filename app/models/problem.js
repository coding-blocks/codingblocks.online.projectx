import DS from "ember-data";
import {computed} from '@ember/object';

export default DS.Model.extend({
  name: DS.attr(),
  content: DS.attr(),
  submissions: DS.hasMany('submission'),
  mostSuccessfullSubmission: computed('submissions', function(){
    const submissions = this.get('submissions');
    return submissions.reduce((prev, curr)=> prev.get("score")>= curr.get("score")? prev: curr, submissions.objectAt(0))
  }),
  "code-challenge": DS.belongsTo('code-challenge')
})