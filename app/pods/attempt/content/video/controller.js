import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class Video extends Controller {
  @service youtubePlayer

  initializePlayer() {
    this.youtubePlayer.initialize('ext-video')
  }
}
