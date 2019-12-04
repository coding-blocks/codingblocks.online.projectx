import Controller from "@ember/controller";
import { action } from "@ember/object";
import { isEqual } from "@ember/utils";
import { computed } from "@ember/object";

export default class ListingIndexController extends Controller {
  tabs = [
    {
      name: "All Jobs",
      component: 'job-listing-panels/all-jobs',
      eligibilityStatus: null
    },
    {
      name: "Eligible Jobs",
      component: 'job-listing-panels/eligible-jobs',
      eligibilityStatus: null
    },
    {
      name: "Applied Jobs",
      component: 'job-listing-panels/applied-jobs',
      eligibilityStatus: null
    }
  ];

  possibleLocations = ["Delhi", "Gurgaon", "Mumbai", "Bengaluru"]
  possibleJobTypes = ['Full-Time', 'Intern']

  activeTab = this.tabs.firstObject

  filter = {};
  eligibilityStatus;
  locations = [];
  jobTypes = [];
  selectedLocations = [];
  selectedJobTypes = [];
  showFilters = false;

  @computed('locations', 'jobTypes', 'selectedLocations', 'selectedJobTypes')
  get showApplyButton() {
    return !isEqual(this.locations, this.selectedLocations) || !isEqual(this.jobTypes, this.selectedJobTypes)
  }

  @action
  changeLocationsFilter(val) {
    this.set("locations", val);
  }

  @action
  changeTypeFilter(val) {
    this.set("jobTypes", val);
  }

  @action
  apply() {
    this.set('selectedLocations', this.locations)
    this.set('selectedJobTypes', this.jobTypes)
  }

  @action
  reset() {
    this.set("locations", []);
    this.set("jobTypes", []);
    this.set("eligibilityStatus", null);
  }

  @action
  removeObject(arr, obj) {
    arr.removeObject(obj)
  }

  @action
  toggleFilterMenu() {
    this.toggleProperty("showFilters");
  }
}
