import Route from '@ember/routing/route';
import env from "codingblocks-online/config/environment";

export default Route.extend({
  loginUrl : `${env.oneauthURL}/oauth/authorize?response_type=code&client_id=${env.clientId}&redirect_uri=${env.publicUrl}`,
  session : Ember.inject.service(),
  api: Ember.inject.service(),
  queryParams:{
    transaction_id:{
      refreshModel: true
    },
    product_ids:{
      refreshModel: true
    }
  },
  model(params) {
    if(this.get('session.isAuthenticated')){
      return this.get('api').request('/run_attempts', {
        method: 'POST',
        data: {
          transaction_id: params.transaction_id,
          product_ids : params.product_ids
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
