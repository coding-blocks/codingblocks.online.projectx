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
    const searchQuery = this.get('qs').trim().toLowerCase()

    try {
      const sections = this.get('run.sections')

      let contents = sections
        .map(section => section.get('contents'))
        .reduce((acc, val) => [...acc, ...val.toArray()], [])
        .filter(content => {
          //return true
          return (content.get('payload.name')
            .toLowerCase()
            .indexOf(searchQuery) > -1)
        })
        .map((content) => {
          return {
            title: content.get('payload.name'),
            sectionId: content.get('section.id'),
            section: content.get('section.name'),
            contentId: content.get('id'),
            isDone: content.get('isDone'),
            iconClass: content.get('iconClass')
          }
        })

      if (contents.length === 0) {
        return [
          {
            title: "Nothing Found!"
          }
        ]
      }

      console.log(contents)
      return contents

    } catch (e) {
      console.error(e)
      return [
        {
          title: "Some Error!"
        }
      ]
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
    later(this, () => {
      this.set('qs', '')
      this.set('hideResultsBox', true)
    }, 100);
  }
}
