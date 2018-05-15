import Ember from 'ember';

export function percentage(params) {
    const [x, total] = params
    const result =  Math.ceil(x/(total) * 100)
    return result || 0
}

export default Ember.Helper.helper(percentage);