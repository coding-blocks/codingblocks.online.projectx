import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { equal, filterBy }  from '@ember/object/computed';

export default Controller.extend({
    store: inject('store'),
    runAttemptService: inject('run-attempt'),
    currentContent: inject('current-content'),
    currentSectionId: computed.alias('runAttemptService.sectionId'),
    sideBarCollapsed: computed('currentContent',function(){
        let contentId = this.get('currentContent').getContentId()
        let content = this.get('store').peekRecord('content', contentId);
        return { left: content.get('contentable') === 'code-challenge', right: true }
    }),
    accordionCollapsed: false,
    activeTab: 'contents',
    isContentsTabActive: equal('activeTab', 'contents'),
    isNotesTabActive: equal('activeTab', 'notes'),
    persistedNotes: filterBy('model.notes', 'isNew', false),
    actions: {
        toggleSideBar() {
            this.toggleProperty("sideBarCollapsed.left")
            this.set('sideBarCollapsed.right', true)
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
                const currentStatus = progress.get('status')
                progress.set("status", currentStatus !== 'UNDONE' ? 'UNDONE': content.get("contentable") === 'code-challenge'? 'ACTIVE': 'DONE')
                await progress.save().then(p => content.set('progress', p))
                
            } else  {
                const newProgress = this.get('store').createRecord('progress', {
                    status: content.get('contentable') ==='code-challenge'? 'ACTIVE': 'DONE',
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
