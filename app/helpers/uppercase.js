import { helper } from '@ember/component/helper';

export function uppercase(params) {
    return params[0].replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export default helper(uppercase);
