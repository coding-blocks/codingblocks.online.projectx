import Component from "@ember/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { alias, bool, reads, equal } from "@ember/object/computed";
import env from "codingblocks-online/config/environment";


export default class navBarComponent extends Component {
  @service session;
  @service currentUser;
  @service domain;
  @service metrics;

  @alias("currentUser.user") user;
  @equal("domain.domain", "hellointern") isAnotherDomain;
  @reads("currentUser.organization") organization;
  @bool("organization") isOrgView;

  showSidebar = false;
  hideHamburgerNav = true;
  mobileSelectedTab = "online";
  logoutLink = env.oneauthURL + '/logout?redirect=' + this.domain.domainBasedPublicUrl + '/logout' 

  didInsertElement() {
    this._super(...arguments);
    // this.$(document).on("click", e => {
    //   this.set('activeTab', false)
    // });
  }

  @action
  toggleHamburgerNav() {
    this.toggleProperty("hideHamburgerNav");
  }

  @action
  toggleNotification() {
    this.metrics.trackEvent({
      action: "notification_clicked",
      category: "navbar_menu"
    })

    if (this.get("activeTab") === "notification") this.set("activeTab", null);
    else this.set("activeTab", "notification");
  }

  @action
  toggleCart() {
    this.metrics.trackEvent({
      action: "cart_clicked",
      category: "navbar_menu"
    })

    if (this.get("activeTab") === "cart") this.set("activeTab", null);
    else this.set("activeTab", "cart");
  }
}
