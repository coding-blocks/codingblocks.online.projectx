import Service from "@ember/service";
import { inject as service } from "@ember/service";
import { alias } from "@ember/object/computed";

export default Service.extend({
  api: service(),
  store: service(),
  session: service(),
  onesignal: service(),
  metrics: service(),
  user: {},
  organization: alias("user.organization"),
  init() {
    // restore org from store
    this._super(...arguments)
    this.set("organization", window.localStorage.getItem("org"));
  },
  async load(force = false) {
    if (force) {
      const { refresh_token } = this.session.data.authenticated
      await this.authenticator.refreshAccessToken(refresh_token)
    }
    if (!force) {
        const currentUser = this.user
        if (currentUser && currentUser.id) {
            return Promise.resolve(currentUser)
        }
    }
    document.cookie = `auth-jwt=${this.get("session.data.authenticated.jwt")}; domain=${window.location.host}; path=/`;

    return this.store
      .queryRecord("user", { custom: { ext: "url", url: "me" } })
      .then(user => {
        this.set("user", user);
        if(this.user.photo==""){
        	this.user.photo="data:image/png;base64,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"
        }
        this.setOrg(user.get("organization"));
        this.onesignal.setExternalId(user.oneauthId)
        this.metrics.identify({
          distinctId: user.oneauthId
        })
        return user;
      });
  },
  setOrg(org) {
    this.set("organization", org);
  }
});
