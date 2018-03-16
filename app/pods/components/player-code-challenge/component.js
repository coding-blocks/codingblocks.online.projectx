import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    code: computed.alias('payload')
});
