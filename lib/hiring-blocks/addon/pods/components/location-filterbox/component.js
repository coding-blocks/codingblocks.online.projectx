import Component from '@ember/component';
import { action, computed }  from '@ember-decorators/object';
import layout from './template';
import { later } from '@ember/runloop';



export default class LocationFilterboxComponent extends Component {
  layout

  possibleLocations = ["Delhi", "Gurgaon", "Mumbai", "Bengaluru"]
  
  @computed('values.length', 'possibleLocations.length') 
  get showAll () {
    return this.get('values.length') == this.get('possibleLocations.length')
  }

  @action
  toggleLocation (val) {
    if (this.values.includes(val)) {
      this.values.removeObject(val)
    } else {
      this.values.addObject(val)
    }

    this.setLocations([...this.values])
  }

  @action
  toggleShowAll () {
    if (!this.showAll)
      this.setLocations([...this.possibleLocations])
  }

}
