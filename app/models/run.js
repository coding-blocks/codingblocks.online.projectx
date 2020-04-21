import { computed } from "@ember/object";
import DS from "ember-data";
import moment from "moment";
import { inject as service } from "@ember/service";

export default DS.Model.extend({
  api: service(),

  name: DS.attr(),
  start: DS.attr(),
  end: DS.attr(),
  enrollmentStart: DS.attr(),
  enrollmentEnd: DS.attr(),
  isFree: DS.attr(),
  price: DS.attr("number"),
  mrp: DS.attr("number"),
  unlisted: DS.attr(),
  runAttemptId: DS.attr(),
  certificateTemplate: DS.attr(),
  completionThreshold: DS.attr("number"),
  goodiesThreshold: DS.attr("number"),
  contestId: DS.attr(),
  whatsappLink: DS.attr(),
  description: DS.attr(),
  productId: DS.attr(),
  totalContents: DS.attr("number"),
  course: DS.belongsTo("course", { inverse: "runs" }),
  sections: DS.hasMany("sections"),
  user: DS.belongsTo("user"),
  runAttempts: DS.hasMany("run-attempt"),
  announcements: DS.hasMany("announcement"),
  ta: DS.hasMany("ta"),
  runRequests: DS.hasMany("run-request"),
  shift: DS.attr(),
  topRunAttempt: computed("runAttempts", function() {
    return this.runAttempts.objectAt(0);
  }),
  isStarted: computed("start", function() {
    return this.start < +new Date() / 1000;
  }),
  startString: computed("start", function() {
    return new Date(this.start * 1000).toISOString().substring(0, 10);
  }),
  sortedSections: computed("sections.@each", function() {
    return this.sections.sortBy("id");
  }),
  isAvailable: computed("enrollmentStart", "enrollmentEnd", function() {
    let enrollmentStart = this.enrollmentStart,
      enrollmentEnd = this.enrollmentEnd,
      now = Math.floor(moment.now() / 1000);
    return enrollmentStart <= now && now < enrollmentEnd && !this.unlisted;
  }),
  totalDuration: computed("sections.@each.contents.@each", function() {
    return this.sections.reduce((acc, section) => {
      return acc + section.get("duration");
    }, 0);
  })
});
