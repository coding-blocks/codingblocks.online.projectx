import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object'
import DS from 'ember-data';
import { later } from '@ember/runloop';

export default class VdoPlayerComponent extends Component {
  @service vdoservice
  @service api

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
        sectionId: this.sectionId,
        runAttemptId: this.runAttemptId
      }
    }).then(({otp}) => this.initPlayer(otp))

    return this._super(...arguments)
  }
}
