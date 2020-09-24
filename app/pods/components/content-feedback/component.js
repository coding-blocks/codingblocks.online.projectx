import Component from '@ember/component';
import { action } from '@ember/object';
import { computed } from '@ember/object';

const BAD_REASONS = [
	'Could not understand topic.',
	'Audio was not clear.',
	'Concept was covered too fast.',
	'Concept was covered too slow.',
	'Prerequisites were not covered.'
]

const GOOD_REASONS = [
	'Concept was convered is best possible manner'
]

export default class ContentFeedbackComponent extends Component {
	expanded = false
	selectedRating = null

	didReceiveAttrs () {
		this._super(...arguments)
		this.selectedRating = this.progress
	}	

	@computed('selectedRating')
	get expansionType () {
		const rating = this.selectedRating
		if (rating === 4 || rating === null)
		return 'NONE'
		else if (rating <= 3) 
		return 'BAD'
		else
		return 'GOOD'
	}
	
	@computed('expansionType')
	get expansionText () {
		switch(this.expansionType) {
			case 'BAD': return 'What went wrong?';
			case 'GOOD': return 'What went awesome?';
			default: return ''
		}
	}
	
	@computed('expansionType')
	get expansionReasons() {
		switch(this.expansionType) {
			case 'BAD': return BAD_REASONS;
			case 'GOOD': return GOOD_REASONS;
			default: return []
		}
	}
	
	@action
	async updateContentFeedback (reason = '') {
		// update everything in progress
		const feedback = {
			rating: this.selectedRating,
			reason
		}
		this.progress.set('feedback', feedback)
		await this.progress.save()
	}
	
	@action
	toggleExpandedView() {
		// this.expanded && this.set('selectedRating', null)
		this.toggleProperty('expanded')
	}
}