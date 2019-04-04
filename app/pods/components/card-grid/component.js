import Component from '@ember/component';
import { action } from '@ember-decorators/object'

export default class CardGridComponent extends Component {
  poppedIndex = -1

  didInsertElement () {
    this._super(...arguments)
    document.addEventListener('click', e => {
      this.set('poppedIndex', -1)  
    })
  }

  @action
  changePoppedCard (index) {
    this.set('poppedIndex', index)
  }
}
