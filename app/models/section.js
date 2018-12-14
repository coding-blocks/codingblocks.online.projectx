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
    return this.get('contents').reduce((acc, curr) => acc + curr.get('duration'), 0)
  }),
  doneContents: computed("contents.@each.isDone", function() {
    return this.get("contents").filter(content => content.get("isDone"));
  }),
  doneFeedbackContents: computed("contents.@each.isFeedbackDone", function() {
    return this.get("contents".filter(content => content.get("isFeedbackDone")))
  }),
  isProgressCompleted: computed("doneContents", function() {
    return this.get("doneContents.length") === this.get("contents.length");
  }),
  contentIcons: computed("contents.@each", function () {
    let icons = []
    this.get("contents").forEach((x) => {
      const icon = x.get("iconClass")
      if (icons.indexOf(icon) === -1) icons.push(icon)
    })
    return icons
  }),
  contents: DS.hasMany("content"),
  run: DS.belongsTo('run'),
  deadline: DS.attr(),
  deadlineDate: computed('deadline', 'run', function(){
    let runStart = moment.unix((this.get('run.start')));
    return this.get('deadline') ? runStart.add(this.get('deadline'), 'd') : undefined;
  })
});
