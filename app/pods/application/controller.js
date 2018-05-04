import Controller from '@ember/controller';
import { computed } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';

export default class  ApplicationController extends Controller {
  @service router
  @computed ('router.currentRouteName')
  isHidden () {
    return ['attempt'].includes(this.get('router.currentRouteName').split('.')[0])
  }
}