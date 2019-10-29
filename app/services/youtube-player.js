import Service from '@ember/service';

export default Service.extend({
  isYoutubeApiReady: false, // is api is ready or not
  player: null, // youtube api Player instance
  active: false,
  initialize(playerElementId) {
    this.set('active', true);
    if (!this.isYoutubeApiReady) {
      var tag = document.createElement('script');
      tag.id = 'iframe-demo';
      tag.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      const playerPromise = new Promise(resolve => {
        window.onYouTubeIframeAPIReady = () => {
          this._setPlayer(playerElementId).then(resolve);
        };
      });
      return playerPromise;
    } else {
      return this._setPlayer(playerElementId);
    }
  },
  _setPlayer(playerId) {
    const playerPromise = new Promise(resolve => {
      // eslint-disable-next-line no-undef
      const player = new YT.Player(playerId, {
        events: {
          onReady: () => {
            this.set('isYoutubeApiReady', true);
            resolve(player);
          },
        },
      });
    });

    playerPromise.then(player => this.set('player', player));
    return playerPromise;
  },
  destroy() {
    if (this.player) {
      this.player.destroy();
    }
    this.set('active', false);
  },
  getCurrentTime() {
    if (this.player) return this.player.getCurrentTime();
    else throw new Error('player: is not set!, Maybe you forgot to initialize first!');
  },
  seek(time) {
    try {
      this.player.seekTo(time, true);
    } catch (e) {
      throw new Error(e);
    }
  },
});
