import Controller from "@ember/controller";
import { action } from "@ember/object";

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
  showFilters = false;

  @action
  changeJobFilter(val) {
    this.set("eligibilityStatus", typeof val == "string" ? val : null);
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
  reset() {
    this.set("locations", []);
    this.set("jobTypes", []);
    this.set("eligibilityStatus", null);
  }

  @action
  toggleFilterMenu() {
    this.toggleProperty("showFilters");
  }
}
