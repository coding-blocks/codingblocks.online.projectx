import Service from '@ember/service'
import { computed } from '@ember/object';

export default class DomainService extends Service {
    
    domain = window.location.hostname.indexOf("hello") == -1 ?  "cb": "hellointern"
    
    @computed('domain')
    get isExternal () {
      return this.domain == 'hellointern'
    }

}