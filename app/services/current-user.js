import Service from "@ember/service";
import { inject as service } from "@ember/service";
import { alias } from "@ember/object/computed";

export default Service.extend({
  api: service(),
  store: service(),
  session: service(),
  onesignal: service(),
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
        this.setOrg(user.get("organization"));
        this.onesignal.setExternalId(user.oneauthId)
        return user;
      });
  },
  setOrg(org) {
    this.set("organization", org);
  }
});
