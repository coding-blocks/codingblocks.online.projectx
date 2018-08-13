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
    yield timeout (100)
    const searchQuery = this.get('qs').trim().toLowerCase()

    try {
      const sections = this.get('run.sections')

      let contents = sections
        .map(section => {
          return section.get('contents').map(content => {
            return {
              content: content,
              section: section
            }
          })
        })
        .reduce((acc, val) => [...acc, ...val.toArray()], [])
        .filter(result => {
          return (result.content.get('payload.name')
            .toLowerCase()
            .indexOf(searchQuery) > -1)
        })
        .map((result) => {
          let content = result.content
          let section = result.section
          return {
            title: content.get('payload.name'),
            sectionId: section.get('id'),
            section: section.get('name'),
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

      return contents

    } catch (e) {
      console.error(e)
      return [
        {
          title: "Some Error!"
        }
      ]
    }
  })

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
    }, 400);
  }
}
