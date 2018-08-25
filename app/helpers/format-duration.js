import { helper } from '@ember/component/helper';

function msToTime(s) {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return (hrs?hrs + ':':'') + mins + ':' + secs;
}

export function formatPrice(params/*, hash*/) {
	let duration = parseInt(params[0]);
	if(isNaN(duration) || duration == 0){
			return "--";
		}
		else{
			return `${msToTime(duration)}`;
		}
}

export default helper(formatPrice);
