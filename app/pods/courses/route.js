import Route from '@ember/routing/route';

export default Route.extend({
    title: function (tokens) {
        tokens = Ember.makeArray(tokens);
        return tokens[0] + ' | CodingBlocks Online';
    },
});
