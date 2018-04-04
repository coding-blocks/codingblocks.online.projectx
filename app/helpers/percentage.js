import Ember from 'ember';

export function percentage(params) {
    const [x, total] = params
    console.log(x, total)
    return Math.ceil(x/(total) * 100)
}

export default Ember.Helper.helper(percentage);