import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
    api: inject(),
    classNames: ['height-100'],
    qna: computed.alias('payload')
})