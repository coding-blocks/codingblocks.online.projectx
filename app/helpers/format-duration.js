import { helper } from '@ember/component/helper';
import moment from 'moment';

const fixedDigits = (val) => ('0' + +val).slice(-2)

export function formatDuration(params) {
	let duration = parseInt(params[0]);
	let options = params[1];
	if(isNaN(duration) || duration == 0){
			return "--";
	} else {
    let res = moment.duration(duration);
    let hours = Math.floor(res.asHours())
    let mins = res.minutes()
    let secs = res.seconds()

    if (options == 'humanize') {
      return (hours ? `${hours} Hours `:'') + (mins ? `${mins} Minutes`:'')
    } else {
      hours = fixedDigits(hours)
      mins = fixedDigits(mins)
      secs = fixedDigits(secs)
      return `${hours}:${mins}:${secs}`;
    }
	}
}

export default helper(formatDuration);
