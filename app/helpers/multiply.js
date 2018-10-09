import { helper } from '@ember/component/helper';

export function multiply(params/*, hash*/) {
  const res =  params[0] * params[1]
  return isNaN(+res) ? 0 : +res 
}

export default helper(multiply);
