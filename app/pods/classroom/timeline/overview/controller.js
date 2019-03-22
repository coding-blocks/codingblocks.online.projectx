import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import config from 'codingblocks-online/config/environment'
import { alias }  from '@ember/object/computed';

export default Controller.extend({
  api: service(),
  discussBaseUrl: config.discussBaseUrl,
  queryParams: ['offset', 'limit'],
  visible: true,
  offset: 0, 
  limit: 5,
  moderators: alias('run.moderators'),
  recentEvents: computed('announcements', 'doubts', function () {
    const announcementsObjs = this.announcements.map(a => ({
      type: 'announcement',
      payload: a,
      icon: 'announcement.svg',
      createdAt: new Date(a.get('createdAt'))
    }))

    const doubtsObjs = this.doubts.map(d => ({
      type: 'doubt',
      payload: d,
      icon: 'support.svg',
      createdAt: new Date(d.created_at)
    }))

    return [...announcementsObjs, ...doubtsObjs].sortBy('createdAt').reverse()
  }),
  actions: {
    requestCertificate () {
      this.api.request('/certificates', {
        method: 'POST',
        data: {
          runAttemptId: this.get('runAttempt.id')
        }
      })
    }
  }
});
