import { helper } from '@ember/component/helper';

export function sub(params/*, hash*/) {
  return (params[0] || '').trim()
}

export default helper(sub);
