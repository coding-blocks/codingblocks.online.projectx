import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { equal }  from '@ember/object/computed';

export default Controller.extend({
    store: inject('store'),
    runAttemptService: inject('run-attempt'),
    currentSectionId: computed.alias('runAttemptService.sectionId'),
    sidebarCollapsed: false,
    accordionCollapsed: false,
    activeTab: 'contents',
    isContentsTabActive: equal('activeTab', 'contents'),
    isNotesTabActive: equal('activeTab', 'notes'),
    actions: {
        toggleSideBar () {
            this.toggleProperty("sidebarCollapsed")
        },
        toggleAccordion () {
            this.toggleProperty("accordionCollapsed")
        },
        transitionToContent (contentId, sectionId) {
            this.get('runAttemptService').setCurrentSection(sectionId)
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
        },
        setActiveTab (tab) {
            this.set("activeTab", tab)
        }
    }
});
