import Component from '@ember/component';
import { action } from '@ember/object';

export default class NavBarPublic extends Component {
  hideHamburgerNav = true;
  mobileSelectedTab = "online";

  @action
  toggleHamburgerNav() {
    this.toggleProperty("hideHamburgerNav");
  }
}
