import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember-decorators/service';
import DS from 'ember-data';
import { later } from '@ember/runloop';

export default class VdoPlayerComponent extends Component {
  @service vdoservice
  @service api

  classNames = ['w-100', 'h-100']

  initPlayer() {
    this.otp.then((otp) => {
      this.vdoservice.setVideo(this.lecture.videoId, otp, this.start)
      const video = this.vdoservice.getVideo().addEventListener('ended', () => {
        this.onVideoCompleted()
      })
    })
  }

  @restartableTask
  *getOtpTask() {
    const { otp } = yield this.api.request('/lectures/otp', {
      data: {
        videoId: this.get('lecture.videoId')
      }
    })
    return otp
  }

  didReceiveAttrs(){
    this.getOtpTask.perform()
    const otp = DS.PromiseObject.create({
      promise: this.getOtpTask.perform()
    })
    this.set('otp', otp)
  }
  
  didInsertElement(){
    later(() => this.initPlayer(), 0)
  }

  didUpdate(){
    later(() => this.initPlayer(), 0)
  }
}
