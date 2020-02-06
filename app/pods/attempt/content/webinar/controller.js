import Controller from '@ember/controller';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import moment from 'moment';

export default class WebinarController extends Controller {
  @service api
  @service player

  started = false

  @computed('webinar.{start_time,duration}', 'started')
  get webinarStatus() {
    const start_time = moment(this.webinar.get('start_time'))
    const end_time = moment(start_time).add(this.webinar.get('duration'), 'minutes')
    // will start
    if (start_time.isAfter() && !this.started) return -1
    // live
    if (start_time.isBefore() && end_time.isAfter()) return 0
    // ended
    if (end_time.isBefore()) return 1
  }

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
