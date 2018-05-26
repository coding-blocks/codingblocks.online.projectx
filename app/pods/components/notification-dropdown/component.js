import Component from '@ember/component';
import { action } from 'ember-decorators/object'
import { task } from 'ember-concurrency';
import { service } from 'ember-decorators/service';

// Notifications Dropdown
// - Highlight unread
// - Mark all as read
// - Poll periodically and update UI
// - There are no more notifications to display
export default class NotificationDropdownComponent extends Component {
  @service store
  @service currentUser

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
      .then (notifications => {
        notifications.forEach (notification => {
          notification.set ('isUnread', this.isUnread (notification))
        })

        return notifications
      })

    this.set ('notifications', notifications)
  })

  isUnread (notification) {
    let id = notification.get ('id'),
      currentUser = this.get ('currentUser'),
      lastReadNotificationID = currentUser.get ('user.lastReadNotification')
    ;

    return (lastReadNotificationID < id)
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
  }

  @action
  markAsRead () {
    let currentUser = this.get ('currentUser.user'),
      notificationIds = this.get ('notifications').mapBy ('id').map (id => parseInt (id)),
      maxNotificationId = Math.max (...notificationIds),
      notifications = this.get ('notifications')
    ;

    if (currentUser.get ('lastReadNotification') < maxNotificationId) {
      currentUser.set ('lastReadNotification', maxNotificationId)
      currentUser.save ()

      notifications.forEach (notification => {
        notification.set ('isUnread', this.isUnread (notification))
      })
    }
  }
}
