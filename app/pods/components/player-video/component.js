import Component from "@ember/component";
import { computed } from "@ember/object";

export default Component.extend({
  classNames: ['height-100'],
  video: computed.alias("payload")
});
