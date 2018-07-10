import { helper } from '@ember/component/helper';

export function base64(param) {
  if(param[0] === 'decode')
    return window.atob(param[1])
  else if (param[0] === 'encode')
    return window.btoa(param[1])
  else
    return 'INVALID 1st argument, pass either "decode" or "encode"'
}

export default helper(base64);
