import Component from '@ember/component';
import { isNone } from '@ember/utils';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';
import { storageFor } from 'ember-local-storage';
import { inject as service } from '@ember/service';

export default Component.extend(KeyboardShortcuts, {
  currentUser : service(),
  lecturePlayer: service(),
  playerPreference: storageFor('player-prefs'),
  isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
  isShowingInstructions: true,
  classNames: ['height-100'],
  keyboardShortcuts: {
    space: {
      action: 'toggleVideoPlayback',
      global: false,
      preventDefault: false
    },
    left: {
      action: 'seekBack',
      global: false
    },
    right: {
      action: 'seekForward',
      global: false
    },
    up () {
      this.send("changeSpeed", 0.25)
    },
    down () {
      this.send("changeSpeed", -0.25)
    }
  },
  seekTo (ms) {
    console.log(ms)
    this.playerElement.currentTime = ms
    this.seekTo = Function.prototype
  },

  didReceiveAttrs () {
    this._super(...arguments)

    if (this.copySrc === this.src)
      return ;

    function queryParams (source) {
      let array = [];
      source.map((key) => {
        array.push(encodeURIComponent(key) + "=" + encodeURIComponent(source[key]));
      })

      return array.join("&");
    }

    const self = this
    const config = {
      xhrSetup(xhr, url) {
        // TODO: send a request to backend and get a signed url to the segment as 301
        try {
          const awsData = self.get('awsData')
          const encoded = queryParams({
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
    const video = this.playerElement;

    if (!isNone(video)) {
      // already have the element
      hls.loadSource(this.src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play()
        this.set('isPlaying', true)
      })
    }
    this.set('hls', hls)
    this.set('copySrc', this.src)
  },

  didInsertElement () {
    this._super(...arguments)
    const video = this.element.querySelectorAll('#video')[0];
    const lecture = this.element.querySelectorAll('.lecture');
    const overlay = this.element.querySelectorAll('.overlay-content');

    let topPos = Math.floor(Math.random() * 100)
    let leftPos = Math.floor(Math.random() * 100)

    overlay[0].style.top = topPos + "%";
    overlay[0].style.left = leftPos + "%";

    setInterval(function () {
      let topPos = Math.floor(Math.random() * 100)
      let leftPos = Math.floor(Math.random() * 100)

      overlay[0].style.top = topPos + "%";
      overlay[0].style.left = leftPos + "%";

    },5000)

    const hls = this.hls;

    this.set('playerElement', video);

    hls.loadSource(this.src);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      if (!this.isSafari)
        video.play()
    });

    video.oncanplay = function() {
       lecture.addClass('spinner');
    };

    video.oncanplaythrough = () => {
       lecture.removeClass('spinner');
       if (this.isSafari)
        this.seekTo.call(this, 1)
    };
    
    if (this.isSafari)
      video.onplay = () => this.seekTo.call(this, 1)
    

    video.onwaiting = function() {
      lecture.addClass('spinner');
    };

    // set the lecture-player service know about the current player
    this.lecturePlayer.activate()
    this.lecturePlayer.setElement(video)
    if (this.start) {
      this.lecturePlayer.seek(this.start)
    }
  },
  willDestroyElement() {
    this.hls.destroy()
    this.playerElement.pause()
    this.lecturePlayer.deactivate()
    this._super(...arguments)
  },
  actions: {
    changeSpeed(val) {
     const rate = +this.pr +val;
     const video = this.playerElement
     if ( rate > 0 && rate <= 2) {
        video.playbackRate = +rate;
        this.set('pr', rate)
      }
   },
   toggleVideoPlayback () {
    const video = this.playerElement
    if (isNone(video))
      return ;
    this.toggleProperty("isPlaying")
    const isPlaying = this.isPlaying
    if (isPlaying) {
      video.play()
    } else {
      video.pause()
    }
   },
   seekBack () {
    const video = this.playerElement
    if (isNone(video))
      return ;
    video.currentTime -= 5
   },
   seekForward () {
    const video = this.playerElement
    if (isNone(video))
      return ;
    video.currentTime += 5
   },
    closeInstructions () {
      let val = this.checkboxVal
      this.set('playerPreference.showInstructions', !val)
      this.set('isShowingInstructions', false)
    }
  }

})
