import Component from '@ember/component';
import { action } from 'ember-decorators/object'
import { isBlank } from '@ember/utils'

export default class AccordianHeadComponent extends Component {

    constructor () {
      super(...arguments)
      if (isBlank(this.get('collapsed'))) {
        this.set('collapsed', true)
      }
    }

    @action
    toggle () {
        this.toggleProperty("collapsed")
    }
}
