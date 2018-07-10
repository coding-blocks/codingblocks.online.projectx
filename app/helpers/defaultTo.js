import { helper } from '@ember/component/helper';

export function defaultTo(params) {
    const [val, defaultVal] = params
    return val || defaultVal
}

export  default helper(defaultTo);
