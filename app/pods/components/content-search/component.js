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

  @service router

  searchTask = task(function*() {
    yield timeout(1000);
    const searchQuery = this.get("qs");
    let sections = this.get("run.sections")
    let results = []
    sections.forEach(section => {
      section.get("contents").forEach(content => {
        try {
          let title = content.get("payload.name").toLowerCase();
          if (title.indexOf(searchQuery.toLowerCase()) !== -1) {
            results.push({
              title: title,
              section: section.get("name"),
              iconClass: content.get("iconClass"),
              contentId: content.get("id"),
              sectionId: section.get("id"),
              isDone: content.get("isDone")
            })
          }
        } catch (error) {
          console.log(error);
        }
      })
    });
    return results;
  }).restartable()

  @action
  transitionToContent(contentId, sectionId) {
    this.get('router').transitionTo('attempt.content', contentId, {
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
    later(this, () => this.set("hideResultsBox", true), 1000);
  }
}
