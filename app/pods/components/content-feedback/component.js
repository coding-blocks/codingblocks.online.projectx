import Component from '@ember/component';

export default Component.extend({
    feedbackState: 'COLLAPSED',
    actions: {
        changeState(newState) {
            this.set('feedbackState', newState)
        },
        submitFeedback(feed) {
            this.onFeedbackSubmit(feed)
            this.send('changeState', 'SUBMITTED')
            setTimeout(() => {
                this.set('showFeedback', false)
            }, 2000)
        }
    }
});
