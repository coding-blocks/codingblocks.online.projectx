import { helper } from '@ember/component/helper';

export function multiply(params/*, hash*/) {
  const fl = Math.floor
  const seconds = fl(params[0])
  const hrs = fl(seconds / 3600)
  const mins = fl(seconds / 60)
  let sec = seconds % 60

  sec = sec > 10 ? sec : '0' + sec
  return (hrs ? `${hrs}:` : '') + `${mins}:${sec}`

}

export default helper(multiply);
