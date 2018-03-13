import Route from "@ember/routing/route";

export default Route.extend({
    model (params) {
        return this.store.findRecord('content', params.contentId, {
            include: 'lecture',
            reload: true
        })
    }
})