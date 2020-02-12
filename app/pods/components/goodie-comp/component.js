import Component from "@ember/component";
import { alias, equal } from "@ember/object/computed";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import { setProperties } from "@ember/object";

export default Component.extend({
  api: service(),
  router: service(),

  isDisabled: false,
  showModal: false,
  collapsed: true,
  tshirt: "",

  progressPercent: alias("runAttempt.progressPercent"),
  run: alias("runAttempt.run"),
  goodieRequests: alias("runAttempt.goodieRequests"),
  statusInProgress: alias("goodieRequests.statusInProgress"),
  thresholdCompleted: computed(
    "statusInProgress",
    "alreadyClaimed",
    "progressPercent",
    "run.goodiesThreshold",
    function() {
      return this.progressPercent > this.get("run.goodiesThreshold");
    }
  ),
  canClaim: alias("thresholdCompleted"),
  alreadyClaimed: equal("statusInProgress", "requested"),
  completed: equal("statusInProgress", "completed"),

  actions: {
    toggleCollapse() {
      this.toggleProperty("collapsed");
    },
    toggleModal() {
      this.toggleProperty("showModal");
    },
    saveForm() {
      this.toggleProperty("isDisabled");

      let formInfo = {
        name: this.get("name"),
        tshirt: this.tshirt,
        address: this.get("address").replace(/\n/g, " "),
        postalCode: this.postalCode,
        alternateContact: this.mobile
      };

      setProperties(this.goodieRequests, {
        formInfo,
        statusInProgress: "requested",
        run: this.runAttempt.run,
        runAttempt: this.runAttempt
      });

      this.get("goodieRequests")
        .save()
        .then(() => {
          this.toggleProperty("showModal");
        });

      this.toggleProperty("isDisabled");
    }
  }
});
