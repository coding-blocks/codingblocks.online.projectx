import Component from '@ember/component';
import { isNone } from '@ember/utils';
import $ from 'jquery'
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';
import { storageFor } from 'ember-local-storage';


export default Component.extend(KeyboardShortcuts, {
  playerPreference: storageFor('player-prefs'),
  isShowingInstructions: true,
  classNames: ['height-100'],
  keyboardShortcuts: {
    space: 'toggleVideoPlayback',
    left: 'seekBack',
    right: 'seekForward',
    up () {
      this.send("changeSpeed", 0.25)
    },
    down () {
      this.send("changeSpeed", -0.25)
    }
  },

  didReceiveAttrs () {
    this._super(...arguments)

    if (this.get('copySrc') === this.get('src'))
      return ;

    const self = this
    const config = {
      xhrSetup(xhr, url) {
        // TODO: send a request to backend and get a signed url to the segment as 301
        try {
          const awsData = self.get('awsData')
          const encoded = $.param({
            "Key-Pair-Id": awsData.keyId,
            "Signature": awsData.signature,
            "Policy": awsData.policyString
          })
          xhr.open('GET', `${url}?${encoded}`, true)
        } catch (e) {
        //  console.error(e)
        }
      }
    }
    this.set('config', config)
    this.set('pr', 1)
    this.set('isPlaying', false)

    const hls = new Hls(config)
    const video = this.get('playerElement');

    if (!isNone(video)) {
      // already have the element
      hls.loadSource(this.get('src'));
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play()
        this.set('isPlaying', true)
      })
    }
    this.set('hls', hls)
    this.set('copySrc', this.get('src'))
  },

  didInsertElement () {
    this._super(...arguments)
    const video = this.$('#video')[0];
    const spinner = this.$('.spinner');
    const lecture = this.$('.lecture');

    const hls = this.get('hls');

    this.set('playerElement', video);

    hls.loadSource(this.get('src'));
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      video.play()
    });

    video.oncanplay = function() {
       lecture.addClass('spinner');

    };


    video.oncanplaythrough = function() {
       lecture.removeClass('spinner');
    };

    video.onwaiting = function() {
      lecture.addClass('spinner');
    };

  },
  willDestroyElement() {
    this.get('hls').destroy()
    this.get('playerElement').pause()
    this._super(...arguments)
  },
  actions: {
    changeSpeed(val) {
     const rate = +this.get('pr') +val;
     const video = this.get('playerElement')
     if ( rate >= -0.5 && rate <= 2) {
        video.playbackRate = +rate;
        this.set('pr', rate)
      }
   },
   toggleVideoPlayback () {
    const video = this.get("playerElement")
    if (isNone(video))
      return ;
    this.toggleProperty("isPlaying")
    const isPlaying = this.get("isPlaying")
    if (isPlaying) {
      video.play()
    } else {
      video.pause()
    }
   },
   seekBack () {
    const video = this.get("playerElement")
    if (isNone(video))
      return ;
    video.currentTime -= 5
   },
   seekForward () {
    const video = this.get("playerElement")
    if (isNone(video))
      return ;
    video.currentTime += 5
   },
    closeInstructions () {
      let val = this.get("checkboxVal")
      this.set('playerPreference.showInstructions', !val)
      this.set('isShowingInstructions', false)
    }
  }

})
