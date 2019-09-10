import showdown from 'showdown';

export function initialize() {
  // register showdownKatex as "katex" extension
  showdown.extension("katex", showdownKatex());
}

export default {
  initialize
};