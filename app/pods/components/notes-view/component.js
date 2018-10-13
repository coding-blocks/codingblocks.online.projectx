import Component from '@ember/component'
import { task } from 'ember-concurrency'
import { service } from 'ember-decorators/service'
import { computed } from "ember-decorators/object";
import DS from 'ember-data';


export default class NotesViewComponent extends Component {
  @service store

  @computed('runAttempt')
  notes() {
    return DS.PromiseObject.create({
      promise: this.get('store').query('note', {
        custom: {
          ext: 'completeUrl',
          url: '/run_attempts/' + this.get('runAttempt.id') + '/relationships/notes'
        }
      })
    })
  }
}
