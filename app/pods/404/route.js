import Route from '@ember/routing/route';

export default Route.extend({
    redirect: function () {
        var url = this.router.location.formatURL('/404');
        if (window.location.pathname !== url) {
            this.transitionTo('/404');
        }
    }
});