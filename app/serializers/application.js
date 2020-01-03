import JSONAPISerializer from '@ember-data/serializer/json-api';
import { pluralize } from 'ember-inflector';
 import { underscore } from '@ember/string';

 export default JSONAPISerializer.extend({
   payloadKeyFromModelName(modelName) {
     return underscore(pluralize(modelName))
  }
});