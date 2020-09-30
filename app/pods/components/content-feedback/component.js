import Component from '@ember/component';
import { action } from '@ember/object';
import { computed } from '@ember/object';
import { restartableTask } from 'ember-concurrency-decorators';

const BAD_REASONS = [
	'Could not understand topic.',
	'Audio was not clear.',
	'Concept was covered too fast.',
	'Concept was covered too slow.',
	'Prerequisites were not covered.'
]

const GOOD_REASONS = [
	'Great examples used',
	'Simple Explanation for Complex Concept',
	'Flawless Audio/Visual experience',
	'Useful code snippets shared '
]

export default class ContentFeedbackComponent extends Component {
	expanded = false
	selectedRating = null
	selectedReason = null
	sayThankYou = false

	didReceiveAttrs() {
		this._super(...arguments)
		this.selectedRating = this.progress.get('feedback.rating')
		this.selectedReason = this.progress.get('feedback.reason')
	}

	@computed('selectedRating')
	get expansionType() {
		const rating = this.selectedRating
		if (rating === 4 || !rating)
			return 'NONE'
		else if (rating <= 3)
			return 'BAD'
		else
			return 'GOOD'
	}

	@computed('expansionType')
	get expansionText() {
		switch (this.expansionType) {
			case 'BAD': return 'What went wrong?';
			case 'GOOD': return 'What went awesome?';
			default: return ''
		}
	}

	@computed('expansionType')
	get expansionReasons() {
		switch (this.expansionType) {
			case 'BAD': return BAD_REASONS;
			case 'GOOD': return GOOD_REASONS;
			default: return []
		}
	}

	@restartableTask updateContentFeedbackTask = function* (reason = '') {
		const feedback = {
			rating: this.selectedRating,
			reason
		}
		this.progress.set('feedback', feedback)
		yield this.progress.save()
		this.set('sayThankYou', true)
	}

	@action
	toggleExpandedView() {
		// this.expanded && this.set('selectedRating', null)
		this.toggleProperty('expanded')
	}

	@action
	setRating(value) {
		if (value === 4) {
			// short circuit flow -> dont wait for reasons; just submit
			return this.updateContentFeedbackTask.perform()
		}

		this.set('selectedRating', value)
	}

	@action
	close() {
		this.set('expanded', false)
	}
}