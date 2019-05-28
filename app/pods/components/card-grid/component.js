import Component from '@ember/component';
import { action } from '@ember/object'

export default class CardGridComponent extends Component {
  poppedIndex = -1

  listner = e => { 
    this.set('poppedIndex', -1)
  }
  

  didInsertElement () {
    this._super(...arguments)
    document.addEventListener('click', this.listner)
  }

  @action
  changePoppedCard (index) {
    this.set('poppedIndex', index)
  }

  willDestroyElement() {
    document.removeEventListener('click', this.listner)
    this._super(...arguments)
  }


}
