import Route from "@ember/routing/route";
import { inject } from '@ember/service'

export default Route.extend({
    api: inject(),
    currentUser: inject(),
    currentContent: inject(),
    runAttemptService: inject('run-attempt'),
    beforeModel() {
        const params = this.paramsFor('attempt.content')
        const section = this.store.peekRecord('section', params.sectionId)

        return section.get('contents')
    },
    model (params) {
        this.runAttemptService.setCurrentSection(params.sectionId)
        this.currentContent.setContentId(params.contentId)
        return this.store.peekRecord('content', params.contentId, {
            include: 'lecture,video,document,code_challenge',
            reload: true
        })
    },
    async afterModel (content) {
        if(!content.get('payload.id')) {
            // we don't have content; so a locked page will be shown
            return ;
        }

        if ( !content.get('isDone')) {
            // create progress for this
            if (await content.get('progress')) {
                const progress = await content.get('progress')
                content.get("contentable") === 'code-challenge' ? progress.set("status", "ACTIVE"):  progress.set("status", "DONE");
                await progress.save().then(p => content.set('progress', p))

            } else  {
                const newProgress = this.store.createRecord('progress', {
                    status: content.get('contentable') === 'code-challenge' ? 'ACTIVE' : 'DONE',
                    runAttempt: this.modelFor('attempt'),
                    content
                })
                await newProgress.save().then(p => content.set('progress', p))
            }
        }
        if (content.get('contentable') === 'code-challenge') {
            const response = await this.api.request('hb/jwt')
            this.set('currentUser.user.hackJwt', response.jwt)
        }
    }
})
