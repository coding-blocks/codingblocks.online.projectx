import env from 'codingblocks-online/config/environment'
const { apiKey, databaseURL, projectId } = env.firebase

const config = { apiKey, databaseURL, projectId }


export const getRef = async (ref) => {
    const firebase = (await import('@firebase/app')).default
    if(!firebase.apps.length)
        firebase.initializeApp(config)
    await import('@firebase/database')
    return firebase.database().ref().child(ref)
}