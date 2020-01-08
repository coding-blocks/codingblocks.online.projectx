import Component from "@ember/component";
import { inject as service } from '@ember/service';

export default class SideNavComponent extends Component {
  @service domain
  @service currentUser
}
