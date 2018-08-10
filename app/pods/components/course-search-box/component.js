// import Component from '@ember/component';
//
// export default Component.extend({
// });
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

  @service api
  @service router

  @alias('searchTask.lastSuccessful.value') results

  searchTask = task(function * () {
    yield timeout (1000)
    const searchQuery = this.get('qs')
    // return this.get('api').request('courses/search', {
    //   data: {
    //     searchQuery
    //   }
    // }).then(response => {
    //   this.set('hideResultsBox', false)
    //   return response
    // })
    var searchResult = []

    const sections = this.get('run.sections')

    let contentIds = sections
      .map(section => section.get('contents'))
      .reduce((acc, val) => [...acc, ...val.toArray()], [])
      .filter(content => {
        return true
      })
      .map((content) => {
        return {
          title: content.get('payload.name'),
          sectionId: content.get("section.id"),
          section: content.get('section.name'),
          contentId: content.get("id"),
          isDone: content.get("isDone"),
          iconClass: content.get('iconClass')
        }
      })

    console.log(contentIds);
    //
    // contents.map((section) => {
    //   section.get('contents').forEach(_ => searchResult.push(_.get('payload')))
    // })
    //
    // searchResult.map((content) => {
    //   return {
    //     title: content.get('name'),
    //     section: content.get("section").get("name")
    //   }
    // })


    // console.log(searchResult)
    return contentIds

    // const contents = this.get('store').peekAll('content')
    // contents.filter(function (item) {
    //   return (content.get("payload").get("name").toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0)
    // }).map((content) => {
    //   searchResult.push({
    //     title: content.get("payload").get("name"),
    //     section: content.get("section").get("name")
    //   })
    // })
    // return searchResult

  }).restartable()

  @action
  transitonToResult (course) {
    if (course.userEnrollment && course.userEnrollment.courseId) {
      return this.get('router').transitionTo("classroom.timeline",
        course.userEnrollment.courseId,
        course.userEnrollment.runId
      )
    } else {
      return this.get('router').transitionTo("courses.id", course.id)
    }
  }

  @action
  showResult () {
    this.set('hideResultsBox', false);
  }
  @action
  hideResult () {
    // later(this, () => this.set('hideResultsBox', true), 100);
  }
}
