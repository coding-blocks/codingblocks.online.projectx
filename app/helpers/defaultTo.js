import Ember from 'ember';

export function defaultTo(params) {
    const [val, defaultVal] = params
    return val || defaultVal
}

export default Ember.Helper.helper(defaultTo);