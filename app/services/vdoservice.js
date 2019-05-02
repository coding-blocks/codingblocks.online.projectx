import Service from '@ember/service';
import ENV from 'codingblocks-online/config/environment'

export default class VdoserviceService extends Service {
  setVideo(videoId, otp, startTime = 0, container){
    let embedInfo = {
      playbackInfo: btoa(JSON.stringify({ videoId })),
      otp,
      theme: ENV.vdoplayerTheme,
      container,
      autoplay: true,
      plugins: [{
        name: 'keyboard',
        options: {
          preset: 'default',
          bindings: {
            'Up': (player) => player.volume += 0.2,
            'Down': (player) => player.volume -= 0.2,
          }
        }
      }],
      startTime,
      noAutoHeight:true
    }
    let video = new VdoPlayer(embedInfo)
    this.set('video', video)
  }

  getVideo(){
    return this.video
  }

  seekTo(seconds){
    this.video.seek(seconds);
  }
}
