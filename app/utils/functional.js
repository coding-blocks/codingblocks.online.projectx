/* Thanks to ~senpai~ :) */

export const pipe = () =>  (param) => arguments.reduce((acc, fn) => fn(acc), param)

export const not = (fn) => () => !fn(...arguments)