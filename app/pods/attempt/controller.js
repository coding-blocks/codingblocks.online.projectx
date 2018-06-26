import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
    store: inject('store'),
    sidebarCollapsed: false,
    accordianCollapsed: false,

    actions: {
        toggleSideBar () {
            this.toggleProperty("sidebarCollapsed")
        },
        toggleAccordian () {
            this.toggleProperty("accordianCollapsed")
        },
        transitionToContent (contentId, sectionId) {
            this.transitionToRoute('attempt.content', contentId, {
              queryParams: {
                sectionId
              }
            })
        },
        async toggleProgress (content) {
            if (await content.get('progress')) {
                // if progress exits
                const progress = await content.get('progress')
                progress.set("status", progress.get('status') === 'DONE' ? 'UNDONE': 'DONE')
                await progress.save().then(p => content.set('progress', p))
                
            } else  {
                const newProgress = this.get('store').createRecord('progress', {
                    status: 'DONE',
                    runAttempt: this.get('model'),
                    content
                })
                await newProgress.save().then(p => content.set('progress', p))
            }
            return false
        }
    }
});
