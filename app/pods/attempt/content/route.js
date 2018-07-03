import Route from "@ember/routing/route";
import { inject } from '@ember/service'
import config from 'codingblocks-online/config/environment'

export default Route.extend({
    api: inject(),
    title: function(tokens) {
        tokens = Ember.makeArray(tokens);
        return tokens[0] + ' | CodingBlocks Online';
    },
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