import { helper } from '@ember/component/helper';

export function find(param) {
  let [needle, haystack] = param
  return haystack.find(h => h == needle)
}

export default helper(find);
