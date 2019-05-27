import { helper } from '@ember/component/helper';

export function split(params) {
  const [str, delim = ','] = params
  return str.split(delim)
}

export default helper(split);
