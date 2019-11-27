/*
  API
  
  @pages: total number of pages
  @current: current page (1 based indexing)
  @onchange: An action to handle page change. Signature -> void: fn (int currentPage)

*/

import Component from "@ember/component";
import { lte } from "@ember/object/computed";
import { computed } from "@ember/object";
import { action } from "@ember/object";
import layout from '../templates/components/w-pagination';

export default class WPaginationComponent extends Component {

  layout = layout

  @lte("current", 1) disabledPrevious;

  @computed("current", "pages")
  get disabledNext() {
    return this.current >= this.pages;
  }

  @computed("current", "size")
  get start() {
    return (this.current - 1) * this.size + 1
  }

  @computed("start", "size")
  get end() {
    return this.start + this.size - 1
  }

  @computed("pages", "size")
  get numberOfTotalResults() {
    return this.pages * this.size
  }
    

  didReceiveAttrs() {
    this._super(...arguments);
    const length = this.pages;
    this.set(
      "pagesArray",
      Array.from({ length }, (v, i) => ++i)
    );
  }

  // previousPage() and nextPage() should only fire when they are enabled,
  //  i.e disabledPrevious and disabledNext is false
  // in disabled state, event doesnot reach Ember
  @action
  previousPage() {
    this.onchange(this.current - 1);
  }

  @action
  nextPage() {
    this.onchange(this.current + 1);
  }
  @action
  goToPage(page) {
    this.onchange(page);
  }
}
