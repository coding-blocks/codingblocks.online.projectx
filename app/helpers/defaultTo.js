import { helper } from '@ember/component/helper';
import { isNone } from '@ember/utils'

export function defaultTo(params) {
    const [val, defaultVal] = params
    return isNone(val) ? defaultVal : val
}

export  default helper(defaultTo);
