import Component from '@ember/component';
import { action } from '@ember/object';
import { later } from '@ember/runloop';

export default class CertificateCompShareComponent extends Component {
  @action
  selectText(e) {
    const el = this.copyTextElement || e.target
    if (document.selection) { // IE
      var range = document.body.createTextRange();
      range.moveToElementText(el);
      range.select();
  } else if (window.getSelection) {
      var range = document.createRange();
      range.selectNodeContents(el);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
  }
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  }

  @action
  scheduleCopy() {
    later(() => {
      this.copyTextElement.click()
    })
  }
}