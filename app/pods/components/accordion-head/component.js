import Component from '@ember/component';
import { action, computed } from '@ember-decorators/object'
import { isBlank } from '@ember/utils'

export default class AccordionHeadComponent extends Component {

    constructor () {
      super(...arguments)
      if (isBlank(this.get('collapsed'))) {
        this.set('collapsed', true)
      }
    }
    classNameBindings= ['listTypeClass']

    @computed ('listType')
    get listTypeClass () {
      return this.get('listType') == 'divided' ? 'list-divided border-radius-none': '';
    }
  

    @action
    toggle () {
        this.toggleProperty("collapsed")
    }
}
