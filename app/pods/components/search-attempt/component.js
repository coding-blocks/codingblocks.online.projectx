import Component from "@ember/component";
import { later } from "@ember/runloop";
import { task } from "ember-concurrency";
import { action } from "ember-decorators/object";
import { alias } from "ember-decorators/object/computed";
import { service } from "ember-decorators/service";

export default class SearchComponent extends Component {
  tagName = 'span'
  hideResultsBox = true;
  qs = '';
  @alias('searchTask.lastSuccessful.value') response
  
  @service router
  @service store
  
  searchTask = task(function* () {
    const searchQuery = yield this.get('qs')
    const contents = this.get('store').peekAll('content');
    let response = []
    
    contents.forEach(function (content) {
      let name = content.get("payload").get("name");
      name = name.toLowerCase();
      
      if (name.indexOf(searchQuery.toLowerCase()) !== -1) {
        let result = {
          title: name,
          section: content.get("section").get("name"),
          iconClass: content.get("iconClass"),
          isDone: content.get("isDone")
        }
        response.push(result)
      }
    })
    return response
  }).restartable()

  @action
  showResult () {
    this.set('hideResultsBox', false);
  }
  @action
  hideResult () {
    later(this, () => this.set('hideResultsBox', true), 100);
  }
}