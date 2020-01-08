import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import { getSeoSchemaForAllCourses } from "codingblocks-online/utils/seo";

export default Route.extend({
  // Don't wait for any api request, everything is lazy loaded on the home page
  headData: service(),
  currentUser: service(),
  session: service(),
  domain: service(),
  metrics: service(),
  beforeModel() {
    this._super(...arguments);

    if (this.get("currentUser.organization")) {
      this.transitionTo(this.get("currentUser.organization"));
    }

    const redirectionPathExternal = localStorage.getItem(
      "redirectionPathExternal"
    );
    if (redirectionPathExternal) {
      // consume this redirect
      localStorage.removeItem("redirectionPathExternal");
      return (window.location.href = redirectionPathExternal);
    }

    const redirectionPath = localStorage.getItem("redirectionPath");
    if (redirectionPath) {
      localStorage.removeItem("redirectionPath");
      this.transitionTo(redirectionPath);
    } else if (this.domain.isExternal) {
      window.location.href = this.domain.domainBasedPublicUrl;
    }

    this.transitionTo('dashboard')
  }
});
