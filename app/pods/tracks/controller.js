import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class Tracks extends Controller {
  @service store

  queryParams = ['status', 'professionId']
  status = 'student'
}
