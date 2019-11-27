import Route from "@ember/routing/route";
import { inject as service } from '@ember/service';

export default class ClassroomRoute extends Route {
  @service headData;

  queryParams = {
    limit: {
      defaultValue: 10
    },
    offset: {
      defaultValue: 0
    }
  }

  afterModel(model) {
    this.set("headData.title", "Coding Blocks Online | My Courses");
  }
}
