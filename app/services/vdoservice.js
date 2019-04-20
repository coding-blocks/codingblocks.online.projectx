import Service from '@ember/service';

export default class VdoserviceService extends Service {
  setVideo(videoId, otp, startTime = 0){
    let embedInfo = {
      playbackInfo: btoa(JSON.stringify({ videoId })),
      otp,
      theme: "9ae8bbe8dd964ddc9bdb932cca1cb59a",
      container: document.querySelector("#embedBox"),
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
