import Route from "@ember/routing/route";
import ApplicationRouteMixin from "ember-simple-auth/mixins/application-route-mixin";
import UtmCookieRouteMixin from "../../mixins/utm-cookie-route"
import { inject as service } from "@ember/service";
import { isNone } from "@ember/utils";
import { get } from '@ember/object';

export default Route.extend(ApplicationRouteMixin, UtmCookieRouteMixin, {
  session: service(),
  currentUser: service(),
  store: service(),
  headData: service(),
  pageProgress: service(),
  onesignal: service(),
  metrics: service(), // !important: keep this here to init trackers for all routes
  // routeAfterAuthentication: 'dashboard',
  queryParams: {
    code: {
      refreshModel: true,
      repalce: true
    }
  },
  async beforeModel(transition) {
    this._super(...arguments)
    this.metrics; // !important: keep this here to init trackers for all routes
    this.onesignal;
    if (!isNone(transition.to.queryParams.code)) {
      if (this.get("session.isAuthenticated")) {
        return "";
        // return this.transitionTo({ queryParams: { code: undefined } })
      }
      // we have ?code qp
      const { code } = transition.to.queryParams;

      return this.session
        .authenticate("authenticator:jwt", {
          identification: code,
          password: code,
          code
        })
        .then(() => this.currentUser.load())
        .then(user => {
          // if user belongs to an org, redirect to the domain
          if (user.get("organization")) {
            this.transitionTo(user.get("organization"));
          }
        })
        .catch(error => {
          if (error.err === "USER_EMAIL_NOT_VERIFIED") {
            return this.transitionTo("error", {
              queryParams: {
                errorCode: "USER_EMAIL_NOT_VERIFIED"
              }
            });
          }
          if (error.name == "USER_LOGGED_IN_ELSEWHERE") {
            return this.transitionTo("login-blocker", {
              queryParams: {
                code: null,
                token: error.logout_token
              }
            });
          }
        });
    }
  },
  model() {
    return this.get("session.isAuthenticated") && this.currentUser.load()
  },
  afterModel(model) {
    this.set("headData.title", "Coding Blocks Online")
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set("model", model);
  },
  actions: {
  loading(transition) {
      const pageProgress = get(this, 'pageProgress');
       pageProgress.start(transition.targetName);
       transition.promise.finally(() => {
         pageProgress.done();
       });
      return true
    }
  }
});
