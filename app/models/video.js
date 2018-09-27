import DS from "ember-data";

export default DS.Model.extend({
    name: DS.attr(),
    descripiton: DS.attr(),
    url: DS.attr(),
    content: DS.belongsTo('content'),
    duration: DS.attr()
})
