import Route from '@ember/routing/route';

export default Route.extend({
  api: Ember.inject.service(),
  model() {
    console.log("inside model hook ");
    if(this.get('session.isAuthenticated')){
      return this.get('api').request('/run_attempts', {
        method: 'POST',
        data: {
          oneauth_id : '1',
          transaction_id: '12',
          products_id : [1,2,3]
        }
      }).then((res)=>{
        this.transitionTo('courses');
      }).catch((err) => {
        this.transitionTo('error', {
          queryParams: {
            errorCode: 'PAYMENT_FAILED'
          }
        })
      })
    }else{
      window.location('accounts.codingblocks.com')
    }
  }
});
