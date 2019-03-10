import DS from "ember-data";
import { computed } from "@ember/object";
import moment from "moment";

export default DS.Model.extend({
  name: DS.attr(),
  premium: DS.attr(),
  totalContents: computed("contents.@each", function () {
    return this.get('contents.length')
  }),
  duration: computed("contents.@each", function () {
    return this.contents.reduce((acc, curr) => acc + curr.get('duration'), 0);
  }),
  doneContents: computed("contents.@each.isDone", function() {
    return this.contents.filter(content => content.get("isDone"));
  }),
  doneFeedbackContents: computed("contents.@each.isFeedbackDone", function() {
    return this.get("contents".filter(content => content.get("isFeedbackDone")))
  }),
  isProgressCompleted: computed("doneContents", function() {
    return this.get("doneContents.length") === this.get("contents.length");
  }),
  contents: DS.hasMany("content", {async: true}),
  run: DS.belongsTo('run'),
  deadline: DS.attr(),
  deadlineDate: computed('deadline', 'run', function(){
    let runStart = moment.unix((this.get('run.start')));
    return this.deadline ? runStart.add(this.deadline, 'd') : undefined;
  })
});
