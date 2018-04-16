import Route from "@ember/routing/route";

export default Route.extend({
    model (params) {
        return this.store.peekRecord('content', params.contentId, {
            include: 'lecture,video,document,code_challenge',
            reload: true
        })
    },
    async afterModel (content) {
        if ( !content.get('isDone') ) {
            // create progress for this
            if (await content.get('progress')) {
                const progress = await content.get('progress')
                progress.set("status", "DONE")
                await progress.save().then(p => content.set('progress', p))
                
            } else  {
                const newProgress = this.store.createRecord('progress', {
                    status: 'DONE',
                    runAttempt: this.modelFor('attempt'),
                    content
                })
                await newProgress.save().then(p => content.set('progress', p))
            }
        }
    }
})