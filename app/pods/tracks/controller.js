import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class Tracks extends Controller {
  @service store
  @service session

  queryParams = ['status', 'professionId']
  status = 'student'
}
