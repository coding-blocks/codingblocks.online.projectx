import Controller from '@ember/controller';

export default Controller.extend({
    sidebarCollapsed: false,
    actions: {
        toggleSideBar () {
            this.toggleProperty("sidebarCollapsed")
        },
        transitionToContent (contentId) {
            this.transitionToRoute('attempt.content', contentId)
        }
    }
});
