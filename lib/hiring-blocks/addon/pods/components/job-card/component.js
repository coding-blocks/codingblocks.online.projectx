import Component from '@ember/component';
import { action }  from '@ember/object';
import { inject as service } from '@ember/service';

export default class JobCardComponent extends Component {
  @service parentRouter

  @action
  goToJob () {
    this.parentRouter.transitionTo('hiring-blocks.listing.job', this.job.id)
  }
}
