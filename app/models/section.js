import DS from "ember-data";
import { computed } from "@ember/object";

export default DS.Model.extend({
  name: DS.attr(),
  premium: DS.attr(),
  totalContents: computed("contents.@each", function () {
    return this.get('contents.length')
  }),
  doneContents: computed("contents.@each.isDone", function() {
    return this.get("contents").filter(content => content.get("isDone"));
  }),
  isProgressCompleted: computed("doneContents", function() {
    return this.get("doneContents.length") === this.get("contents.length");
  }),
  contents: DS.hasMany("content"),
  sortContents: function () {
    const contents = this.get('contents')
    Promise.resolve(contents).then(contents => {
      this.set('contents', contents.sortBy('sectionContent.order'))
    })
  }.on('didLoad')
});
