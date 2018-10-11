import Service from '@ember/service';

export default Service.extend({
  isYoutubeApiReady: false, // is api is ready or not
  player: null, // youtube api Player instance
  active: false,
  initialize (playerElementId) {
    if (!this.get('isYoutubeApiReady')) {
      var tag = document.createElement('script');
      tag.id = 'iframe-demo';
      tag.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = () => this._setPlayer(playerElementId)
    } else {
      this._setPlayer(playerElementId)
    }

    this.set('active', true)
  },
  _setPlayer(playerId) {
    const player = new YT.Player(playerId, {
      events: {
        onReady: () => this.set("isYoutubeApiReady", true)
      }
    })
    this.set("player", player)
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
  }

});
