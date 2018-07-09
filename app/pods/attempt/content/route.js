import Route from "@ember/routing/route";
import { inject } from '@ember/service'

export default Route.extend({
    api: inject(),
    currentUser: inject(),

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
        if (content.get('contentable') === 'code-challenge') {
            const response = await this.get('api').request('hb/jwt')
            this.set('currentUser.user.hackJwt', response.jwt)
        }
    }
})
