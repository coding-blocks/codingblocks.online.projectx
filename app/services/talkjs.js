import Service from '@ember/service';
import { inject as service } from '@ember/service';
import config from 'codingblocks-online/config/environment';
import { computed } from '@ember/object';

export default class TalkjsService extends Service {
  @service currentUser;
  @service api;

  @computed('currentUser.user')
  get currentChatUser() {
    const user = this.currentUser.user;
    // eslint-disable-next-line no-undef
    const me = new Talk.User({
      id: user.id,
      name: user.firstname,
      email: user.email,
      photo: user.photo,
    });
    return me;
  }

  @computed('currentUser.user')
  get currentUserSignature() {
    return this.api.request('/users/me/chatSignature').then(result => result.signature);
  }

  async setupSession() {
    const me = this.currentChatUser;
    const signature = await this.currentUserSignature;

    // eslint-disable-next-line no-undef
    window.talkSession = new Talk.Session({
      appId: config.talkjs.appId,
      me,
      signature,
    });

    return window.talkSession;
  }

  async startChat(conversationId) {
    const me = this.currentChatUser;

    const talkSession = await this.setupSession();

    var conversation = talkSession.getOrCreateConversation(conversationId);
    conversation.setParticipant(me);

    var popup = talkSession.createPopup(conversation, { keepOpen: false });
    popup.mount();
  }
}
