import Component from "@ember/component";
import { later } from "@ember/runloop";
import { task, timeout } from "ember-concurrency";
import { action } from "ember-decorators/object";
import { alias } from "ember-decorators/object/computed";
import { service } from "ember-decorators/service";

export default class SearchBoxComponent extends Component {
  tagName = 'span'
  hideResultsBox = true
  qs = ''
  @alias('searchTask.lastSuccessful.value') results

  @service raven
  @service router
  @service store

  searchTask = task(function*() {
    // yield timeout(1000);
    const searchQuery = this.get("qs");
    const contents = this.get("store").peekAll("content");
    let results = [];
    contents.forEach(function(content) {
      try {
        let title = content.get("payload").get("name");
        title = title.toLowerCase();
        if (title.indexOf(searchQuery.toLowerCase()) !== -1) {
          let section = content.get("section");
          let a = {
            title: title,
            section: section.get("name"),
            iconClass: content.get("iconClass"),
            contentId: content.get("id"),
            sectionId: section.get("id")
          };
          results.push(a);
        }
      } catch (error) {
        // this.get("raven").captureException(error);
      }
    });
    console.log(results);
    return results;
  });

  @action
  transitionToContent(contentId, sectionId) {
    console.log(contentId, sectionId);
    return this.get('router').transitionTo('attempt.content', contentId, {
      queryParams: {
        s: sectionId
      }
    });
  }

  @action
  showResult() {
    this.set("hideResultsBox", false);
  }
  @action
  hideResult() {
    later(this, () => this.set("hideResultsBox", true), 100);
  }
}
