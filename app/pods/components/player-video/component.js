import Component from "@ember/component";
import { computed } from "@ember/object";
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['height-100'],
  youtubePlayer: service(),
  video: computed.alias("payload"),
  didInsertElement () {
    this._super(...arguments)
    this.get('youtubePlayer').initialize('ext-video')
  },
  willDestroyElement () {
    this.get('youtubePlayer').destroy()
    this._super(...arguments)
  }
});
