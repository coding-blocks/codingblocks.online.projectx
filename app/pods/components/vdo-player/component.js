
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { once } from 'codingblocks-online/utils/functional'
import { dropTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';

export default class VdoPlayerComponent extends Component {
  @service vdoservice
  @service api
  @service player

  classNames = ['w-100', 'h-100']

  @dropTask onTimeUpdateTask = function* (updateProgressOnce) {
    yield timeout(500)
    const duration = this.lecture.get('duration') / 1000

    if ((this.video.currentTime / duration) > 0.9) {
      yield updateProgressOnce()
    }
  }

  initPlayer(otp) {
    this.vdoservice.setVideo(this.lecture.get('videoId'), otp, this.start, this.element)
    const video = this.vdoservice.getVideo()
    this.set('video', video)

    // attached "ended" listener
    this.onCompleteListener = () => { this.onVideoCompleted() }
    video.addEventListener('ended', this.onCompleteListener)

    // can only call this once
    const updateProgressOnce = once(() => this.markProgress())

    video.addEventListener('progress', () => this.onTimeUpdateTask.perform(updateProgressOnce))
  }
  
  didRender () {
    this.api.request('/lectures/otp', {
      data: {
        videoId: this.lecture.get('videoId'),
        sectionId: this.player.sectionId,
        runAttemptId: this.player.runAttemptId,
        contentId: this.player.contentId
      }
    }).then(({otp}) => this.initPlayer(otp))

    return this._super(...arguments)
  }
}
