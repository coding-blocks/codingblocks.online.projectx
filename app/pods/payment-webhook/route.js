import Route from '@ember/routing/route';

export default Route.extend({
  api: Ember.inject.service(),
  queryParams:{
    transaction_id:{
      refreshModel: true
    },
    products_id:{
      refreshModel: true
    }
  },
  model(params) {

    console.log('here')
    if(this.session()){
      return this.get('api').request('/run_attempts', {
        method: 'POST',
        data: {
          oneauth_id : req.user.oneauth_id,
          transaction_id: params.transaction_id,
          products_id : params.products_id
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
      window.location.href('accounts.codingblocks.com')
    }
  }
});
