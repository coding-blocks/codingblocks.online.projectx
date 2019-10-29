import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default class TalkjsInboxComponent extends Component {
  @service talkjs;

  didInsertElement() {
    this._super(...arguments);

    // eslint-disable-next-line no-undef
    Talk.ready
      .then(() => this.talkjs.setupSession())
      .then(talkSession => {
        const inbox = talkSession.createInbox();
        inbox.mount(this.element);
      });
  }
}
