import { helper } from '@ember/component/helper';

export function find(param) {
  const [needle, haystack] = param
  return haystack.indexOf(needle) !== -1
}

export default helper(find);
