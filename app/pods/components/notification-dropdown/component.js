import Component from '@ember/component';
import { action } from '@ember/object';
import { equal } from '@ember/object/computed';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

// Notifications Dropdown
// - Highlight unread
// - Mark all as read
// - Poll periodically and update UI
// - There are no more notifications to display
export default class NotificationDropdownComponent extends Component {
  @service store
  @service currentUser

  notifications = []
  unreadNotifications = true

  refreshInterval = 60000

  offset = 0
  limit = 50
  page = 1

  stopPropagation = e => e.stopPropagation()

  didReceiveAttrs () {
    this._super (...arguments)

    this.get('loadNotifications').perform ()

    setInterval (() =>
      this.get ('loadNotifications').perform (),
      this.get('refreshInterval')
    )
  }

  didInsertElement() {
    this.element
      .querySelectorAll('#notification-icon,#notification-box')
      .forEach(el => el.addEventListener('click', this.stopPropagation))
  }

  @restartableTask loadNotifications = function *() {
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
  }

  @equal('activeTab', 'notification') showDialog

  isUnread (notification) {
    let id = notification.get ('id'),
      currentUser = this.get ('currentUser'),
      lastReadNotificationID = currentUser.get ('user.lastReadNotification')
    ;

    return (lastReadNotificationID < id)
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

  willDestroyElement () {
    document.removeEventListener("click", this.stopPropagation)
    this.element
      .querySelectorAll('#notification-icon,#notification-box')
      .forEach(el => el.removeEventListener('click', this.stopPropagation))
  }
}
