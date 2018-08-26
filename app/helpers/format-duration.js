import { helper } from '@ember/component/helper';
import moment from 'moment';

export function formatPrice(params/*, hash*/) {
	let duration = parseInt(params[0]);
	if(isNaN(duration) || duration == 0){
			return "--";
		}
		else{
			let res = moment.duration(duration)._data;
      return (res.hours?`0${res.hours}`.slice(-2) + ':':'00:')
        + (res.minutes?`0${res.minutes}`.slice(-2) + ':':'00:')
        + (res.seconds?`0${res.seconds}`.slice(-2) :'00');
		}
}

export default helper(formatPrice);
