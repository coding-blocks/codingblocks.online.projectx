import Component from '@ember/component';
import { inject as service } from '@ember/service';


export default class VdoPlayerComponent extends Component {
  @service vdoservice
  @service api
  @service player

  classNames = ['w-100', 'h-100']

  initPlayer(otp) {
    this.vdoservice.setVideo(this.lecture.get('videoId'), otp, this.start, this.element)
    const video = this.vdoservice.getVideo()
    video.addEventListener('ended', () => { this.onVideoCompleted() })
  
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
