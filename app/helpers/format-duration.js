import { helper } from '@ember/component/helper';
import moment from 'moment';

const fixedDigits = (val) => ('0' + +val).slice(-2)

export function formatDuration(params) {
	let duration = parseInt(params[0]);
	if(isNaN(duration) || duration == 0){
			return "--";
		}
		else{
			let res = moment.duration(duration);
      const hours = fixedDigits(Math.floor(res.asHours()))
      const mins = fixedDigits(res.minutes())
      const secs = fixedDigits(res.seconds())

      return `${hours}:${mins}:${secs}`;
		}
}

export default helper(formatDuration);
