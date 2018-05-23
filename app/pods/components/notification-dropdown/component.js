import Component from '@ember/component';
import { action } from 'ember-decorators/object'
import { task } from 'ember-concurrency';
import { service } from 'ember-decorators/service';

// Notifications Dropdown
// - Grab last N paginated requests
// - Grab lastReadNotificationID from User
// - Mark all as read
// - Poll periodically and update UI
// - There are no more notifications to display
export default class NotificationDropdownComponent extends Component {
  @service store

  active = false
  notifications = []
  unreadNotifications = false

  refreshInterval = 60000

  offset = 0
  limit = 3
  page = 1

  constructor () {
    super (...arguments)

    this.get('loadNotifications').perform ()

    setInterval (() =>
      this.get ('loadNotifications').perform (),
      this.get('refreshInterval')
    )
  }

  loadNotifications = task(function * () {
    const notifications = yield this.get ('store').query ('notification', {
      page: {
        offset: this.get ('offset'),
        limit: this.get ('limit')
      },
      sort: '-id',
      custom: {
        ext: 'url',
        url: 'me'
      }
    })

    this.set ('notifications', notifications)
  })

  // Mark notifications as read
  // - if the user clicks mark as read
  // - if the notifications box is active for more than five seconds
  // - if the notification is clicked

  updateLastReadNotifications () {
  }

  @action
  toggle () {
    return this.toggleProperty ("active")
  }

  @action
  nextPage () {
    let offset = this.get ('offset'),
      limit = this.get ('limit'),
      page = this.get ('page'),
      notificationCount = this.get ('notifications.meta.pagination.count')
    ;

    let maxPageCount = Math.ceil (notificationCount / limit)

    console.log ('maxPageCount', maxPageCount)
    console.log ('page', page)

    if (page >= maxPageCount)
      return

    this.set ('page', page + 1)
    this.set ('offset', offset + limit)
    this.get ('loadNotifications').perform ()
  }

  @action
  previousPage () {
    let offset = this.get ('offset'),
      limit = this.get ('limit'),
      page = this.get ('page')
    ;

    if (offset <= 0)
      return

    this.set ('offset', offset - limit)
    this.set ('page', page - 1)
    this.get ('loadNotifications').perform ()

    console.log ('SET OFFSET: ', this.get ('offset'))
  }

  @action
  markAsRead () {
    // Update user's last read notification
  }
}
