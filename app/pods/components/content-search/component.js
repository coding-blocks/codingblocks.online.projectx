import Component from "@ember/component";
import { later } from "@ember/runloop";
import { task, timeout } from "ember-concurrency";
import { action } from "ember-decorators/object";
import { alias } from "ember-decorators/object/computed";
import { service } from "ember-decorators/service";
import $ from 'jquery';

export default class SearchBoxComponent extends Component {
  tagName = 'span'
  hideResultsBox = true
  qs = ''
  @alias('searchTask.lastSuccessful.value') results

  @service router
  @service store

  searchTask = task(function* () {
    const searchQuery = yield this.get('qs')
    const contents = this.get('store').peekAll('content');
    let results = []
    contents.forEach(function (content) {
      try {
        let name = content.get("payload").get("name")
        name = name.toLowerCase();
        if (name.indexOf(searchQuery.toLowerCase()) !== -1) {
          let a = {
            title: name,
            section: content.get("section").get("name"),
            iconClass: content.get("iconClass")
          }
          results.push(a)
        }
      } catch (error) {
      }
    })
    console.log(results)
    return results
  })
  // @action
  // transitonToResult (course) {
  //   if (course.userEnrollment && course.userEnrollment.courseId) {
  //     return this.get('router').transitionTo("classroom.timeline", 
  //     course.userEnrollment.courseId,
  //     course.userEnrollment.runId
  //     )
  //   } else {
  //     return this.get('router').transitionTo("courses.id", course.id)
  //   }
  // }

  @action
  showResult () {
    this.set('hideResultsBox', false);
  }
  @action
  hideResult () {
    later(this, () => this.set('hideResultsBox', true), 100);
  }
}
