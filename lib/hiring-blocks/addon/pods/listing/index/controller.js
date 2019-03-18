import Controller from '@ember/controller';
import { action }  from '@ember-decorators/object';

export default class ListingIndexController extends Controller {
  filter = {}
  eligibilityStatus
  locations = []
  jobTypes = []

  @action
  changeJobFilter (val) {
    this.set('eligibilityStatus', val)
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

}
