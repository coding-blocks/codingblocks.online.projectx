import Component from '@ember/component';
import { inject as service } from '@ember-decorators/service';
import { computed } from '@ember-decorators/object'
import DS from 'ember-data';
import { later } from '@ember/runloop';

export default class VdoPlayerComponent extends Component {
  @service vdoservice
  @service api

  classNames = ['w-100', 'h-100']

  @computed('lecture.videoId')
  get otp () {
    return DS.PromiseObject.create({
      promise: this.api.request('/lectures/otp', {
        data: {
          videoId: this.lecture.videoId,
          sectionId: this.sectionId,
          runAttemptId: this.runAttempt.id
        }
      })
    })
  }

  initPlayer() {
    this.otp.then(({otp}) => {
      this.vdoservice.setVideo(this.lecture.videoId, otp, this.start, this.element)
      const video = this.vdoservice.getVideo()
      video.addEventListener('ended', () => { this.onVideoCompleted() })
    })
  }
  
  didInsertElement(){
    later(() => this.initPlayer(), 0)
  }
}
