import Route from '@ember/routing/route';

export default Route.extend({
  session : Ember.inject.service(),
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
    if(this.get('session.isAuthenticated')){
      return this.get('api').request('/run_attempts', {
        method: 'POST',
        data: {
          transaction_id: params.transaction_id,
          products_id : params.products_id
        }
      }).then((res)=>{
        this.transitionTo('classroom');
      }).catch((err) => {
        this.transitionTo('error', {
          queryParams: {
            errorCode: 'PAYMENT_FAILED'
          }
        })
      })
    }else{
      window.location.href = this.get('loginUrl')
    }
  }
});
