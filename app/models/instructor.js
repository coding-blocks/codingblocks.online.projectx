import DS from "ember-data";

export default DS.Model.extend({
    name: DS.attr(),
    description: DS.attr(),
    photo: DS.attr(),
    courses: DS.hasMany('course'),
    email: DS.attr()
})