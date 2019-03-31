import env from 'codingblocks-online/config/environment'
import firebase from '@firebase/app'
import '@firebase/database'

const { apiKey, databaseURL, projectId } = env.firebase

const config = { apiKey, databaseURL, projectId }

firebase.initializeApp(config)

export const getRef = (ref) => firebase.database().ref().child(ref)