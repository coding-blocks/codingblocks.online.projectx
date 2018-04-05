import Ember from 'ember';

export function percentage(params) {
    const [x, total] = params
    return Math.ceil(x/(total) * 100)
}

export default Ember.Helper.helper(percentage);