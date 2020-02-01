import { helper } from '@ember/component/helper';
import { assign } from '@ember/polyfills';

export default helper(function(hashes, hash) {
  // return assign(Object.create(null), ...hashes, hash);
  return assign({}, ...hashes, hash);
});