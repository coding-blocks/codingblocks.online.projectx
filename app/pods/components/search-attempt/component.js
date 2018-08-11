import Component from "@ember/component";
import { later } from "@ember/runloop";
import { task, timeout } from "ember-concurrency";
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
    yield timeout(500);
    const searchQuery = yield this.get('qs')
    let response = []
    let sections = this.get('run.sections')
    
    try {
        sections.forEach((section) => {
          let contents = section.get('contents')
          
          contents.forEach((content) => {
            let title = content.get('payload.name').toLowerCase();
            
            if (name.indexOf(searchQuery.toLowerCase()) !== -1) {
              let result = {
                title: title,
                contentId: content.get('id'),
                sectionId: content.get('section.id'),
                section: content.get('section.name'),
                iconClass: content.get('iconClass'),
                isDone: content.get('isDone')
              }
              response.push(result)
            }
          })
        })
        return response
    } catch(e) {
        console.error(e)
        let result = {
          title: 'Your search doesn\'t match any results!'
        }
        response.push(result)
        return response
    }
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
  showResult () {
    this.set('hideResultsBox', false);
  }
  @action
  hideResult () {
    later(this, () => this.set('hideResultsBox', true), 100);
  }
}