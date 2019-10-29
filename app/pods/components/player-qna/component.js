import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  api: inject(),
  classNames: ['height-100'],
  qna: alias('payload'),
});
