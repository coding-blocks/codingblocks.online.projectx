import DS from "ember-data";
import { computed } from "@ember/object";

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
  isProgressCompleted: computed("doneContents", function() {
    return this.get("doneContents.length") === this.get("contents.length");
  }),
  contents: DS.hasMany("content")
});
