import DS from "ember-data";
import { computed } from "@ember/object";
import moment from "moment";

export default DS.Model.extend({
  description: DS.attr(),
  location: DS.attr(),
  role: DS.attr(),
  title: DS.attr(),
  type: DS.attr(),
  eligibility: DS.attr(),
  ctc: DS.attr(),
  status: DS.attr(),
  experience: DS.attr(),
  eligible: DS.attr('boolean'),
  company: DS.belongsTo('company'),
  courses: DS.hasMany('course'),
  myApplication: DS.belongsTo('application'),
  createdAt: DS.attr(),
  deadline: DS.attr(),
  postedOn: DS.attr(),
  form: DS.attr(),
  deadlineStr: computed('deadline', function() {
    const date = moment(this.get('deadline'))
    if (date.unix() > 1e10) return 'No Deadline'
    return date.format('Do MMM YY')
  })
})