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
}
