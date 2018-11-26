import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr(),
    email: DS.attr(),
    description: DS.attr(),
    photo: DS.attr(),
    phone: DS.attr(),
})