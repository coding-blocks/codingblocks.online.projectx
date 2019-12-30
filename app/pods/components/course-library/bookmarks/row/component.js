import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';

export default class BookmarksRowComponent extends Component{
    @action
    deleteBookmark() {
        this.get('bookmark').deleteRecord()
        this.get('bookmark').save()
    }
};
