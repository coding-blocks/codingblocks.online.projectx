import Controller from '@ember/controller';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class WebinarController extends Controller {
  @service api
  @service player

  @dropTask startWebinarTask = function *() {
    const response = yield this.api.request(`webinars/${this.get('webinar.id')}/register`, {
      data: {
        sectionId: this.player.sectionId,
        runAttemptId: this.player.runAttemptId,
        contentId: this.player.contentId
      }
    })

    window.open(response.join_url, 'Webinar Window', 'menubar=no,location=no,resizable=yes,scrollbars=yes,status=yes,width=350,height=250')
  }
}
