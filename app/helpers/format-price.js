import { helper } from '@ember/component/helper';

export function formatPrice(params/*, hash*/) {
	let price = parseInt(params[0]);
	if(price == 0){
  		return "Free";
  	}
  	else{ 
  		return `₹ ${price}`;
  	}
}

export default helper(formatPrice);
