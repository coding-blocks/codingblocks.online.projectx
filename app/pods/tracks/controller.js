import Controller from '@ember/controller';
import { restartableTask } from 'ember-concurrency-decorators';

export default class Tracks extends Controller {
  @restartableTask onSearchTask = function *(opts) {
    console.log(opts)
  }
}
