import DS from "ember-data";
import { computed } from '@ember/object'
import { isValidResult, isPassedTestcase } from "codingblocks-online/utils/testcases";
import { pipe, not } from "codingblocks-online/utils/functional";

export default DS.Model.extend({
  language: DS.attr(),
  score: DS.attr(),
  'submit-at': DS.attr(),
  user: DS.belongsTo('user')
})