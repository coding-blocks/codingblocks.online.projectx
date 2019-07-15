import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default Route.extend({
    // Don't wait for any api request, everything is lazy loaded on the home page
  headData: service(),
  currentUser: service(),
  beforeModel () {
    if(this.get('currentUser.organization')) {
      this.transitionTo(this.get('currentUser.organization'))
    }
    return this._super(...arguments)
  },
  afterModel(model) {
    const head = this.headData
    head.set('title', 'Coding Blocks Online | Home')
    head.set('description', 'Coding Blocks is the best online programming and software training Institute offer online certification courses in Jave, C++, Android, NodeJs, Data structure, Machine learning, Interview preparation and more.')
    head.set('image', 'https://codingblocks.com/assets/images/cb/cblogo.png')
    head.set('url', 'https://online.codingblocks.com/')
  },

});
