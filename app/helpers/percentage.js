import { helper } from '@ember/component/helper';

export function percentage(params) {
    const [x, total] = params
    const result =  Math.ceil(x/(total) * 100)
    return result || 0
}

export default helper(percentage);
