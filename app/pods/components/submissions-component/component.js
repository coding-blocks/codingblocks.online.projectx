import Component from '@ember/component';
import { service } from 'ember-decorators/service'

export default class SubmissionsComponent extends Component {
  @service hbApi
  @service store

  didReceiveAttrs () {
    this._super(...arguments)
    console.log('didreceiveAttr  here')
    let payload = this.get('problemPayload')
    if (payload) {
      payload = JSON.parse(JSON.stringify(payload))
      this.get('store').unloadAll('problem')
      this.get('store').pushPayload(payload)
      this.set('problem', this.get('store').peekAll('problem').objectAt(0))
    }
  }
}
