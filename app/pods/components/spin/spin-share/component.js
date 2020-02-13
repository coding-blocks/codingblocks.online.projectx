import Component from '@ember/component';
import { action } from '@ember/object';

export default class SpinShare extends Component {
  @action
  selectText(e) {
    const el = e.target
    if (document.selection) { // IE
        var range = document.body.createTextRange()
        range.moveToElementText(el)
        range.select()
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNodeContents(el)
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(range)
    }
    document.execCommand('copy')
    window.getSelection().removeAllRanges()
  }
}
