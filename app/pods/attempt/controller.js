import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { action } from '@ember/object';
import { alias } from '@ember/object/computed';

export default class AttemptController extends Controller {
  @service store
  @service player

  @alias ('player.sectionId') currentSectionId

  tabs = [
    {
      name: 'Doubts',
      component: 'player/player-doubts-tab'
    },
    {
      name: 'Notes',
      component: 'player/player-notes-tab'
    },
    {
      name: 'Announcements',
      component: 'player/player-announcements-tab'
    },
  ]
  activeTab = this.tabs.firstObject

  @action 
  openAskDoubtModal() {
    const content = this.store.peekRecord('content', this.player.contentId)
    const runAttempt = this.store.peekRecord('run-attempt', this.player.runAttemptId)
    const doubt = this.store.createRecord('doubt', {
      content,
      runAttempt
    })

    this.set('newDoubt', doubt)
    this.set('showAskDoubtModal', true)
  }

  @action
  closeAskDoubtModal() {
    this.newDoubt.rollbackAttributes()
    this.set('showAskDoubtModal', false)
  }
  
  @action
  toggleSideBar() {
    this.toggleProperty("sideBarCollapsed.left");
    this.set("sideBarCollapsed.right", true);
  }
  
  @action
  async toggleProgress(content) {
    if (await content.get("progress")) {
      // if progress exits
      const progress = await content.get("progress");
      const currentStatus = progress.get("status");
      progress.set(
        "status",
        currentStatus !== "UNDONE"
          ? "UNDONE"
          : content.get("contentable") === "code-challenge"
          ? "ACTIVE"
          : "DONE"
      );
      await progress.save().then(p => content.set("progress", p));
    } else {
      const newProgress = this.store.createRecord("progress", {
        status:
          content.get("contentable") === "code-challenge" ? "ACTIVE" : "DONE",
        runAttempt: this.model,
        content
      });
      await newProgress.save().then(p => content.set("progress", p));
    }
    return false;
  }
}
