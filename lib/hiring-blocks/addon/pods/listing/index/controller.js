import Controller from '@ember/controller';
import { action }  from '@ember-decorators/object';

export default class ListingIndexController extends Controller {
  filter = {}
  eligibilityStatus
  locations = []
  jobTypes = []
  showFilters = false

  @action
  changeJobFilter (val) {
    this.set('eligibilityStatus', typeof val == 'string' ? val : null)
  }

  @action
  changeLocationsFilter (val) {
    console.log("here", val)
    this.set("locations", val)
  }

  @action
  changeTypeFilter (val) {
    this.set("jobTypes", val)
  }

  @action
  reset() {
    this.set('locations', [])
    this.set('jobTypes', [])
    this.set('eligibilityStatus', null)
  }

  @action 
  toggleFilterMenu() {
    this.toggleProperty('showFilters');
  }

}
