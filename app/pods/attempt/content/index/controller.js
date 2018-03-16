import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    componentName: computed('model.contentable', function () {
        const contentable = this.get('model.contentable')
        
        switch (contentable) {
            case 'lecture': return 'player-lecture';
            case 'document': return 'player-document';
            case 'video': return 'player-video';
            case 'code-challenge': return 'player-code-challenge';
        }
    })
});
