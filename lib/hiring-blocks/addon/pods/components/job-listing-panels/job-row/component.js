import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import ENV from 'codingblocks-online/config/environment'

export default Component.extend({
  layout,

  jobViewUrl : computed('job.id', function () {
    return ENV.hiringblocksUrl + '/jobs/' + this.job.id
  })
});
