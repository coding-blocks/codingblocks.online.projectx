import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { action } from '@ember/object';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';

export default class AttemptController extends Controller {
  @service store
  @service player
  @service productTour

  @alias('player.sectionId') currentSectionId

  @computed('currentSectionId')
  get currentSection() {
    return  this.currentSectionId && this.store.peekRecord('section', this.currentSectionId)
  }

  @computed('player.contentId')
  get currentContent() {
    return this.player.contentId && this.store.peekRecord('content', this.player.contentId)
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

  @action
  toggleContentList() {
    this.toggleProperty('contentListCollpased')
  }

  @action
  startTour() {
    this.productTour.start(true)
  }
}
