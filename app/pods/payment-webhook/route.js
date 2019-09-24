import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import env from "codingblocks-online/config/environment";
import { getPublicUrl } from "codingblocks-online/utils/browser"


export default Route.extend({
  loginUrl : `${env.oneauthURL}/oauth/authorize?response_type=code&client_id=${env.clientId}&redirect_uri=${getPublicUrl()}`,
  session : service(),
  api: service(),
  queryParams:{
    transaction_id:{
      refreshModel: true
    },
    product_ids:{
      refreshModel: true
    }
  },
  model(params) {
    if (JSON.parse(params.product_ids)[0].type == "extension") {
      return this.transitionTo('classroom');
    }

    if(this.get('session.isAuthenticated')){
      return this.api.request('/run_attempts', {
        method: 'POST',
        data: {
          transaction_id: params.transaction_id,
          product_ids : JSON.parse(params.product_ids)
        }
      }).then((res)=>{
        this.transitionTo('classroom');
      }).catch((err) => {
        this.transitionTo('error', {
          queryParams: {
            errorCode: 'PAYMENT_FAILED'
          }
        })
      });
    }else{
      window.location.href = this.loginUrl
    }
  }
});
