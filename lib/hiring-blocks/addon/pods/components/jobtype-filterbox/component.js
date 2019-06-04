import Component from '@ember/component';
import layout from './template';
import { action, computed } from '@ember/object'


export default class JobtypeFilterboxComponent extends Component {
  layout
  
  possibleValues = ['Full-Time', 'Intern']
  
  @computed('values.length', 'possibleValues.length') 
  get showAll () {
    return this.get('values.length') == this.get('possibleValues.length')
  }

  @action
  toggleJobType (val) {
    if (this.values.includes(val)) {
      this.values.removeObject(val)
    } else {
      this.values.addObject(val)
    }
    this.setJobTypes([...this.values])
  }

  @action
  toggleShowAll () {
    if (!this.showAll)
      this.setJobTypes([...this.possibleValues])
  }
}
