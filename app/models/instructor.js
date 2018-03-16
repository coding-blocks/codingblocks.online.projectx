import DS from "ember-data";

export default DS.Model.extend({
    name: DS.attr(),
    descrption: DS.attr(),
    photo: DS.attr(),
    course: DS.hasMany('course')
})