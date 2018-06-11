import { helper } from '@ember/component/helper';

export function getEmbeded(param) {
  if(param[0])
    return (param[0]).replace('watch?v=','embed/')
  else
    return null
}

export default helper(getEmbeded);
