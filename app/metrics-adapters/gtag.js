import BaseAdapter from 'ember-metrics/metrics-adapters/base';

export default BaseAdapter.extend({
  toStringExtension() {
    return 'gtag';
  },

  init() {
    const { config } = this
    const { id } = config

    var newScript = document.createElement("script");
    newScript.type = "text/javascript";
    newScript.setAttribute("async", "true");
    newScript.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=" + id);
    document.documentElement.firstChild.appendChild(newScript);

    newScript.onload = () => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = () => dataLayer.push(arguments)
      gtag('js', new Date());
      gtag('config', id);
    }
  },

  identify() {

  },

  trackEvent({ event, ...options }) {
    window.gtag('event', event, options)
  },

  trackPage({name, ...options}) {
    // window.gtag('event', name, options)
  },

  alias() {

  },

  willDestroy() {
    document.querySelectorAll('script[src*="googletagmanager"]').forEach(el => {
      el.parentElement.removeChild(el);
    });
  }
});
