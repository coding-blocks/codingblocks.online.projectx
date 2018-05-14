import Route from '@ember/routing/route';

export default Route.extend({
    model () {
      console.log ('-------------')
      console.log ('-------------')
      console.log ("Generic Debug Statement")
      console.log ("Generic Debug Statement")
      console.log ("Generic Debug Statement")
      console.log ('-------------')
      console.log ('-------------')
      return this.store.query ('notification', {
        custom: {
          ext: 'url',
          url: 'sex'
        }
      })
    }
});
