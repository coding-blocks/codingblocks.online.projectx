import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['height-100'],
  youtubePlayer: service(),
  video: alias('payload'),
  didInsertElement() {
    this._super(...arguments);
    this.youtubePlayer.initialize('ext-video').then(() => {
      this.youtubePlayer.seek(this.start);
    });
  },
  willDestroyElement() {
    this.youtubePlayer.destroy();
    this._super(...arguments);
  },
});
