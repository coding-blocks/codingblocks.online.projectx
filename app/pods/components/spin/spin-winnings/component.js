import Component from '@ember/component';
import { action } from '@ember/object';

export default class SpinWinning extends Component {
  carouselId = 'winning-carousel'
  itemId = 'winning-0'

  @action
  scroll(direction) {
    const element = document.getElementById(this.carouselId)
    const item = document.getElementById(this.itemId)
    const leftOffset = (direction === 'left' ? -1 : 1) * item.offsetWidth

    element.scrollBy({ behavior: 'smooth', left: leftOffset })
  }

  @action
  selectText(e) {
    const el = e.target
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
}
