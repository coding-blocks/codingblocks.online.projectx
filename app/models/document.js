import DS from "ember-data";

export default DS.Model.extend({
    name: DS.attr(),
    markdown: DS.attr(),
    pdfLink: DS.attr(),
    content: DS.belongsTo('content')
})