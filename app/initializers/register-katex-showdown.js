import showdown from 'showdown';

export function initialize() {
  // register showdownKatex as "katex" extension
  // eslint-disable-next-line no-undef
  showdown.extension('katex', showdownKatex());
}

export default {
  initialize,
};
