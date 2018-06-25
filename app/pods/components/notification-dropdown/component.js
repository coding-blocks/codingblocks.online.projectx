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
  iconWasClicked = false
  clickedOnNotifyBox = false
  notifications = []
  unreadNotifications = true

  refreshInterval = 60000

  offset = 0
  limit = 50
  page = 1

  constructor () {
    super (...arguments)

    this.get('loadNotifications').perform ()

    setInterval (() =>
      this.get ('loadNotifications').perform (),
      this.get('refreshInterval')
    )
  }

  didInsertElement() {

    // CHECKS IF NOTIFICATION BOX IS CLICKED OR NOT
    // SETS FLAG ACCORDINGLY
    this.$('#notification-box').on("click", () => {
      this.toggleProperty("clickedOnNotifyBox")
    });

    // TOGGLES THE ACTIVE STATUS IF IT IS TRUE ALREADY
    // AND NOTIFICATION ICON & NOTIFICATION BOX ARE NOT
    // CLICKED!
    this.$(document).on("click", () => {
      let isPresent = this.get('active')
      let avoidable2 = this.get('iconWasClicked')
      let avoidable1 = this.get('clickedOnNotifyBox')
      if (!avoidable2 && isPresent && !avoidable1) {
        this.toggleProperty ("active")
      }
      // BELOW CODE RESETS THE FLAGS SO THAT THEY CAN
      // BE USED FOR CLICK EVENTS IN FUTURE (NEXT CLICK EVENTS)
      if (avoidable1) {
        this.toggleProperty('clickedOnNotifyBox')  
      }
      if (avoidable2) {
        this.toggleProperty('iconWasClicked')
      }
    });
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
    this.get('loadNotifications').perform ()
    this.toggleProperty ("active")
    this.toggleProperty("iconWasClicked")
    return
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
