import Service from '@ember/service';

export default Service.extend({
  isYoutubeApiReady: false, // is api is ready or not
  player: null, // youtube api Player instance
  active: false,
  initialize (playerElementId) {
    this.set('active', true)
    if (!this.get('isYoutubeApiReady')) {
      var tag = document.createElement('script');
      tag.id = 'iframe-demo';
      tag.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      const playerPromise = new Promise((resolve) => {
        window.onYouTubeIframeAPIReady = () => {
          this._setPlayer(playerElementId).then(resolve)
        }
      })
      return playerPromise
    } else {
      return this._setPlayer(playerElementId)
    }
  },
  _setPlayer(playerId) {
    const playerPromise = new Promise ((resolve, reject) => {
        const player = new YT.Player(playerId, {
        events: {
          onReady: () => {
            this.set("isYoutubeApiReady", true)
            resolve(player)
          }
        }
      })
    })
    
    playerPromise.then(player => this.set("player", player))
    return playerPromise
  },
  destroy () {
    if (this.get('player')) {
      this.get('player').destroy()
    }
    this.set('active', false)
  },
  getCurrentTime () {
    if (this.get('player'))
      return this.get('player').getCurrentTime()
    else 
      throw new Error('player: is not set!, Maybe you forgot to initialize first!')
  },
  seek (time) {
    try {
      this.get("player").seekTo(time, true)
    } catch (e) {
      console.log("Error: Cannot seek youtube player", e)
    }
  }

});
